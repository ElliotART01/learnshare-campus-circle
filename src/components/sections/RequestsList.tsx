
import React, { useState } from 'react';
import { ItemCard } from '@/components/cards/ItemCard';
import { Request } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

interface RequestsListProps {
  requests: Request[];
}

export const RequestsList: React.FC<RequestsListProps> = ({ requests }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { currentUser } = useAuth();
  
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'open' && request.status === 'Open') ||
      (statusFilter === 'fulfilled' && request.status === 'Fulfilled');
    
    return matchesSearch && matchesStatus;
  });
  
  // Check if a request belongs to the current user
  const isUserRequest = (request: Request) => {
    return currentUser?.email === request.studentEmail;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs 
          value={statusFilter} 
          onValueChange={setStatusFilter}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="open" className="flex-1">Open</TabsTrigger>
            <TabsTrigger value="fulfilled" className="flex-1">Fulfilled</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No requests found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request) => (
            <div key={request.id} className="relative">
              {isUserRequest(request) && (
                <Badge className="absolute top-2 right-2 z-10 bg-primary">Your Post</Badge>
              )}
              <ItemCard
                key={request.id}
                id={request.id}
                title={request.title}
                description={request.description}
                studentName={request.studentName}
                studentEmail={request.studentEmail}
                timestamp={request.timestamp}
                status={request.status}
                type="request"
                imageUrl={request.imageUrl}
                isOwner={isUserRequest(request)}
              />
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
    </div>
  );
};
