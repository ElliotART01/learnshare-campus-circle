
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  condition
}) => {
  const { toast } = useToast();
  
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const handleContact = () => {
    window.location.href = `mailto:${studentEmail}?subject=Regarding your ${type}: ${title}`;
    toast({
      title: "Contact initiated",
      description: `Opening email to contact ${studentName}`,
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
        <p className="text-sm text-gray-700">{description}</p>
        {condition && (
          <p className="text-sm mt-2">
            <span className="font-medium">Condition:</span> {condition}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button 
          onClick={handleContact}
          className="w-full" 
          disabled={status !== 'Open' && status !== 'Available'}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact {type === 'request' ? 'Requester' : 'Offerer'}
        </Button>
      </CardFooter>
    </Card>
  );
};
