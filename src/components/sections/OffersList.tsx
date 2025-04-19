
import React, { useState } from 'react';
import { ItemCard } from '@/components/cards/ItemCard';
import { Offer } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OffersListProps {
  offers: Offer[];
}

export const OffersList: React.FC<OffersListProps> = ({ offers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  
  const filteredOffers = offers.filter(offer => {
    const matchesSearch = 
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCondition = 
      conditionFilter === 'all' || 
      offer.condition === conditionFilter;
    
    return matchesSearch && matchesCondition;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search offers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-48">
          <Select 
            value={conditionFilter} 
            onValueChange={setConditionFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value="Like New">Like New</SelectItem>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Used">Used</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredOffers.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No offers found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOffers.map((offer) => (
            <ItemCard
              key={offer.id}
              id={offer.id}
              title={offer.title}
              description={offer.description}
              studentName={offer.studentName}
              studentEmail={offer.studentEmail}
              timestamp={offer.timestamp}
              status={offer.status}
              type="offer"
              condition={offer.condition}
            />
          ))}
        </div>
      )}
    </div>
  );
};
