
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Edit, Trash2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  studentName: string;
  studentEmail: string;
  timestamp: string;
  status: string;
  type: 'request' | 'offer';
  condition?: string;
  imageUrl?: string;
  isOwner?: boolean;
  onStatusChange?: (newStatus: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  description,
  studentName,
  studentEmail,
  timestamp,
  status,
  type,
  condition,
  imageUrl,
  isOwner,
  onStatusChange
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const handleContact = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to contact other users.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    window.location.href = `mailto:${studentEmail}?subject=Regarding your ${type}: ${title}`;
    toast({
      title: "Contact initiated",
      description: `Opening email to contact ${studentName}`,
    });
  };

  const handleStatusToggle = () => {
    if (!onStatusChange) return;
    
    const newStatus = type === 'request' 
      ? (status === 'Open' ? 'Fulfilled' : 'Open')
      : (status === 'Available' ? 'Claimed' : 'Available');
    
    onStatusChange(newStatus);
    
    toast({
      title: "Status updated",
      description: `Item marked as ${newStatus}`,
    });
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge 
            variant={
              status === 'Open' || status === 'Available' 
                ? 'default' 
                : 'secondary'
            }
            className={
              status === 'Open' || status === 'Available'
                ? 'bg-green-500'
                : 'bg-gray-500'
            }
          >
            {status}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500 mt-1">
          Posted by {studentName} on {formattedDate}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {imageUrl && (
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
        <p className="text-sm text-gray-700">{description}</p>
        {condition && (
          <p className="text-sm mt-2">
            <span className="font-medium">Condition:</span> {condition}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t flex gap-2">
        {isOwner ? (
          <Button 
            onClick={handleStatusToggle}
            className="w-full"
            variant={status === 'Open' || status === 'Available' ? 'default' : 'outline'}
          >
            <Check className="w-4 h-4 mr-2" />
            Mark as {status === 'Open' || status === 'Available' ? 'Fulfilled' : 'Available'}
          </Button>
        ) : (
          <Button 
            onClick={handleContact}
            className="w-full" 
            disabled={status !== 'Open' && status !== 'Available'}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact {type === 'request' ? 'Requester' : 'Offerer'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
