
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { ItemForm } from "@/components/forms/ItemForm";
import { RequestsList } from "@/components/sections/RequestsList";
import { OffersList } from "@/components/sections/OffersList";
import { mockRequests, mockOffers } from "@/data/mockData";
import { Request, Offer, storageUtils } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState("browse-offers");
  const [requests, setRequests] = useState<Request[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    // Initialize with localStorage data if available, otherwise use mock data
    const storedRequests = storageUtils.getRequests();
    const storedOffers = storageUtils.getOffers();
    
    setRequests(storedRequests.length > 0 ? storedRequests : mockRequests);
    setOffers(storedOffers.length > 0 ? storedOffers : mockOffers);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (requests.length > 0) {
      storageUtils.saveRequests(requests);
    }
  }, [requests]);

  useEffect(() => {
    if (offers.length > 0) {
      storageUtils.saveOffers(offers);
    }
  }, [offers]);

  const handleFormSubmitSuccess = (data: any, type: 'request' | 'offer') => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a post.",
        variant: "destructive",
      });
      return;
    }
    
    const timestamp = new Date().toISOString();
    
    if (type === 'request') {
      const newRequest: Request = {
        id: uuidv4(),
        studentEmail: currentUser.email,
        studentName: currentUser.name,
        title: data.title,
        description: data.description,
        status: 'Open',
        timestamp: timestamp,
        imageUrl: data.imageUrl
      };
      
      const updatedRequests = [...requests, newRequest];
      setRequests(updatedRequests);
      storageUtils.saveRequests(updatedRequests); // Immediately save to localStorage
      setActiveTab("browse-requests");
      
      toast({
        title: "Request created",
        description: "Your request has been successfully posted.",
      });
    } else if (type === 'offer') {
      const newOffer: Offer = {
        id: uuidv4(),
        studentEmail: currentUser.email,
        studentName: currentUser.name,
        title: data.title,
        description: data.description,
        condition: data.condition,
        status: 'Available',
        timestamp: timestamp,
        imageUrl: data.imageUrl
      };
      
      const updatedOffers = [...offers, newOffer];
      setOffers(updatedOffers);
      storageUtils.saveOffers(updatedOffers); // Immediately save to localStorage
      setActiveTab("browse-offers");
      
      toast({
        title: "Offer created",
        description: "Your offer has been successfully posted.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Campus Circle</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with fellow students to exchange educational materials. 
            Request what you need or offer what you no longer use.
          </p>
        </div>
        
        <Tabs 
          defaultValue="browse-offers" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="post-request">Post Request</TabsTrigger>
            <TabsTrigger value="post-offer">Post Offer</TabsTrigger>
            <TabsTrigger value="browse-requests">Browse Requests</TabsTrigger>
            <TabsTrigger value="browse-offers">Browse Offers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="post-request" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <ItemForm type="request" onSubmitSuccess={(data) => handleFormSubmitSuccess(data, 'request')} />
            </div>
          </TabsContent>
          
          <TabsContent value="post-offer" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <ItemForm type="offer" onSubmitSuccess={(data) => handleFormSubmitSuccess(data, 'offer')} />
            </div>
          </TabsContent>
          
          <TabsContent value="browse-requests" className="mt-6">
            <RequestsList requests={requests} />
          </TabsContent>
          
          <TabsContent value="browse-offers" className="mt-6">
            <OffersList offers={offers} />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">© 2024 Campus Circle - Connecting Students</p>
          <p className="text-sm text-gray-400 mt-2">
            A platform for students to exchange educational materials
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
