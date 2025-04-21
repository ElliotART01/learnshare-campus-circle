import { useState, useEffect } from 'react';
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ItemCard } from "@/components/cards/ItemCard";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Request, Offer, storageUtils } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  
  const [userRequests, setUserRequests] = useState<Request[]>([]);
  const [userOffers, setUserOffers] = useState<Offer[]>([]);
  
  const [selectedItem, setSelectedItem] = useState<Request | Offer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'claim' | 'delete'>('edit');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [claimNotes, setClaimNotes] = useState('');
  
  useEffect(() => {
    const allRequests = storageUtils.getRequests();
    const allOffers = storageUtils.getOffers();
    
    if (currentUser) {
      setUserRequests(allRequests.filter(request => request.studentEmail === currentUser.email));
      setUserOffers(allOffers.filter(offer => offer.studentEmail === currentUser.email));
    }
  }, [currentUser]);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const handleStatusChange = (id: string, newStatus: string, type: 'request' | 'offer') => {
    if (type === 'request') {
      const updatedRequests = userRequests.map(item => 
        item.id === id ? { ...item, status: newStatus as 'Open' | 'Fulfilled' } : item
      );
      setUserRequests(updatedRequests);
      
      const allRequests = storageUtils.getRequests();
      const updatedAllRequests = allRequests.map(item => 
        item.id === id ? { ...item, status: newStatus as 'Open' | 'Fulfilled' } : item
      );
      storageUtils.saveRequests(updatedAllRequests);
    } else {
      const updatedOffers = userOffers.map(item => 
        item.id === id ? { ...item, status: newStatus as 'Available' | 'Claimed' } : item
      );
      setUserOffers(updatedOffers);
      
      const allOffers = storageUtils.getOffers();
      const updatedAllOffers = allOffers.map(item => 
        item.id === id ? { ...item, status: newStatus as 'Available' | 'Claimed' } : item
      );
      storageUtils.saveOffers(updatedAllOffers);
    }
    
    toast({
      title: "Status updated",
      description: `Item marked as ${newStatus}`,
    });
  };
  
  const handleEditClick = (item: Request | Offer) => {
    setSelectedItem(item);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };
  
  const handleClaimClick = (item: Request | Offer) => {
    setSelectedItem(item);
    setClaimNotes(item.claimNotes || '');
    setDialogMode('claim');
    setIsDialogOpen(true);
  };
  
  const handleDeleteClick = (item: Request | Offer) => {
    setSelectedItem(item);
    setDialogMode('delete');
    setIsDialogOpen(true);
  };
  
  const handleSaveEdit = () => {
    if (!selectedItem) return;
    
    const isRequest = 'condition' in selectedItem ? false : true;
    
    if (isRequest) {
      const updatedRequests = userRequests.map(item => 
        item.id === selectedItem.id 
          ? { ...item, title: editTitle, description: editDescription } 
          : item
      );
      setUserRequests(updatedRequests);
      
      const allRequests = storageUtils.getRequests();
      const updatedAllRequests = allRequests.map(item => 
        item.id === selectedItem.id 
          ? { ...item, title: editTitle, description: editDescription } 
          : item
      );
      storageUtils.saveRequests(updatedAllRequests);
    } else {
      const updatedOffers = userOffers.map(item => 
        item.id === selectedItem.id 
          ? { ...item, title: editTitle, description: editDescription } 
          : item
      );
      setUserOffers(updatedOffers);
      
      const allOffers = storageUtils.getOffers();
      const updatedAllOffers = allOffers.map(item => 
        item.id === selectedItem.id 
          ? { ...item, title: editTitle, description: editDescription } 
          : item
      );
      storageUtils.saveOffers(updatedAllOffers);
    }
    
    setIsDialogOpen(false);
    toast({
      title: "Item updated",
      description: "Your post has been successfully updated.",
    });
  };
  
  const handleSaveClaim = () => {
    if (!selectedItem) return;
    
    const isRequest = 'condition' in selectedItem ? false : true;
    const newStatus = isRequest ? 'Fulfilled' : 'Claimed';
    
    if (isRequest) {
      const updatedRequests = userRequests.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              status: 'Fulfilled', 
              claimNotes,
              claimedBy: currentUser?.name || 'Unknown'
            } 
          : item
      );
      setUserRequests(updatedRequests);
      
      const allRequests = storageUtils.getRequests();
      const updatedAllRequests = allRequests.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              status: 'Fulfilled', 
              claimNotes,
              claimedBy: currentUser?.name || 'Unknown'
            } 
          : item
      );
      storageUtils.saveRequests(updatedAllRequests);
    } else {
      const updatedOffers = userOffers.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              status: 'Claimed', 
              claimNotes,
              claimedBy: currentUser?.name || 'Unknown'
            } 
          : item
      );
      setUserOffers(updatedOffers);
      
      const allOffers = storageUtils.getOffers();
      const updatedAllOffers = allOffers.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              status: 'Claimed', 
              claimNotes,
              claimedBy: currentUser?.name || 'Unknown'
            } 
          : item
      );
      storageUtils.saveOffers(updatedAllOffers);
    }
    
    setIsDialogOpen(false);
    toast({
      title: "Status updated",
      description: `Item marked as ${newStatus} with notes.`,
    });
  };
  
  const handleConfirmDelete = () => {
    if (!selectedItem) return;
    
    const isRequest = 'condition' in selectedItem ? false : true;
    
    if (isRequest) {
      const updatedRequests = userRequests.filter(item => item.id !== selectedItem.id);
      setUserRequests(updatedRequests);
      
      const allRequests = storageUtils.getRequests();
      const updatedAllRequests = allRequests.filter(item => item.id !== selectedItem.id);
      storageUtils.saveRequests(updatedAllRequests);
    } else {
      const updatedOffers = userOffers.filter(item => item.id !== selectedItem.id);
      setUserOffers(updatedOffers);
      
      const allOffers = storageUtils.getOffers();
      const updatedAllOffers = allOffers.filter(item => item.id !== selectedItem.id);
      storageUtils.saveOffers(updatedAllOffers);
    }
    
    setIsDialogOpen(false);
    toast({
      title: "Item deleted",
      description: "Your post has been successfully deleted.",
    });
  };

  const getNameInitial = (name: string) => {
    return name?.charAt(0).toUpperCase() || '?';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-lg">
                {currentUser ? getNameInitial(currentUser.name) : '?'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
              <p className="text-gray-600">{currentUser?.email}</p>

              <div className="mt-3 space-y-1 text-sm rounded bg-white shadow px-4 py-2 border border-gray-200">
                <p><span className="font-medium">Major:</span> {currentUser?.major || <span className="italic text-gray-400">Not set</span>}</p>
                <p><span className="font-medium">Age:</span> {currentUser?.age ? currentUser.age : <span className="italic text-gray-400">Not set</span>}</p>
                <p><span className="font-medium">Gender:</span> {currentUser?.gender ? currentUser.gender : <span className="italic text-gray-400">Not set</span>}</p>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-md bg-gray-100">
                <p className="text-2xl font-bold">{userRequests.length}</p>
                <p className="text-sm text-gray-600">Requests</p>
              </div>
              <div className="p-4 rounded-md bg-gray-100">
                <p className="text-2xl font-bold">{userOffers.length}</p>
                <p className="text-sm text-gray-600">Offers</p>
              </div>
              <div className="p-4 rounded-md bg-gray-100">
                <p className="text-2xl font-bold">
                  {userRequests.filter(req => req.status === 'Fulfilled').length}
                </p>
                <p className="text-sm text-gray-600">Fulfilled</p>
              </div>
              <div className="p-4 rounded-md bg-gray-100">
                <p className="text-2xl font-bold">
                  {userOffers.filter(offer => offer.status === 'Claimed').length}
                </p>
                <p className="text-sm text-gray-600">Claimed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="requests" className="w-full">
          <TabsList>
            <TabsTrigger value="requests">Your Requests</TabsTrigger>
            <TabsTrigger value="offers">Your Offers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests" className="mt-6">
            {userRequests.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">You haven't created any requests yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userRequests.map((request) => (
                  <div key={request.id} className="relative">
                    <Badge className="absolute top-2 right-2 z-10 bg-primary">Your Post</Badge>
                    <ItemCard
                      id={request.id}
                      title={request.title}
                      description={request.description}
                      studentName={request.studentName}
                      studentEmail={request.studentEmail}
                      timestamp={request.timestamp}
                      status={request.status}
                      type="request"
                      imageUrl={request.imageUrl}
                      isOwner={true}
                      onStatusChange={(status) => handleStatusChange(request.id, status, 'request')}
                    />
                    <div className="mt-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleEditClick(request)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleClaimClick(request)}
                      >
                        Add Notes
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleDeleteClick(request)}
                      >
                        Delete
                      </Button>
                    </div>
                    {request.claimNotes && (
                      <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                        <p className="font-medium">Notes:</p>
                        <p>{request.claimNotes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="offers" className="mt-6">
            {userOffers.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">You haven't created any offers yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userOffers.map((offer) => (
                  <div key={offer.id} className="relative">
                    <Badge className="absolute top-2 right-2 z-10 bg-primary">Your Post</Badge>
                    <ItemCard
                      id={offer.id}
                      title={offer.title}
                      description={offer.description}
                      studentName={offer.studentName}
                      studentEmail={offer.studentEmail}
                      timestamp={offer.timestamp}
                      status={offer.status}
                      type="offer"
                      condition={offer.condition}
                      imageUrl={offer.imageUrl}
                      isOwner={true}
                      onStatusChange={(status) => handleStatusChange(offer.id, status, 'offer')}
                    />
                    <div className="mt-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleEditClick(offer)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleClaimClick(offer)}
                      >
                        Add Notes
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleDeleteClick(offer)}
                      >
                        Delete
                      </Button>
                    </div>
                    {offer.claimNotes && (
                      <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                        <p className="font-medium">Notes:</p>
                        <p>{offer.claimNotes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'edit' && 'Edit Post'}
              {dialogMode === 'claim' && 'Add Claim Notes'}
              {dialogMode === 'delete' && 'Delete Post'}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === 'edit' && 'Update the details of your post.'}
              {dialogMode === 'claim' && 'Add notes about who claimed this item.'}
              {dialogMode === 'delete' && 'Are you sure you want to delete this post? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          
          {dialogMode === 'edit' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <Input 
                  id="title" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea 
                  id="description" 
                  value={editDescription} 
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          
          {dialogMode === 'claim' && (
            <div>
              <label htmlFor="claimNotes" className="block text-sm font-medium text-gray-700">Claim Notes</label>
              <Textarea 
                id="claimNotes" 
                value={claimNotes} 
                onChange={(e) => setClaimNotes(e.target.value)}
                placeholder="e.g., Given to Sarah on 4/25"
                rows={4}
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            
            {dialogMode === 'edit' && (
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            )}
            
            {dialogMode === 'claim' && (
              <Button onClick={handleSaveClaim}>Save Notes</Button>
            )}
            
            {dialogMode === 'delete' && (
              <Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
