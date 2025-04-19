
import React, { useState } from 'react';
import { ItemCard } from '@/components/cards/ItemCard';
import { Request } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface RequestsListProps {
  requests: Request[];
}

export const RequestsList: React.FC<RequestsListProps> = ({ requests }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRequests = requests.filter(request => 
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search requests..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No requests found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request) => (
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
            />
          ))}
        </div>
      )}
    </div>
  );
};
