
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const requestSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  studentName: z.string().min(2, { message: "Name is required." }),
  studentEmail: z.string().email({ message: "Valid email is required." }),
  studentPhone: z.string().optional(),
});

const offerSchema = requestSchema.extend({
  condition: z.enum(['Like New', 'Good', 'Used'], {
    required_error: "Please select the condition of the item.",
  }),
});

interface ItemFormProps {
  type: 'request' | 'offer';
  onSubmitSuccess: () => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ type, onSubmitSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<any>({
    resolver: zodResolver(type === 'request' ? requestSchema : offerSchema),
    defaultValues: {
      title: '',
      description: '',
      studentName: '',
      studentEmail: '',
      studentPhone: '',
      condition: type === 'offer' ? 'Good' : undefined,
    },
  });
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', data);
      toast({
        title: "Success!",
        description: `Your ${type} has been posted.`,
      });
      form.reset();
      setIsSubmitting(false);
      onSubmitSuccess();
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a {type.charAt(0).toUpperCase() + type.slice(1)}</CardTitle>
        <CardDescription>
          {type === 'request' 
            ? "Let others know what educational materials you need."
            : "Share educational materials you no longer need with others."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder={`E.g., ${type === 'request' ? 'Need Calculus Textbook' : 'Offering Psychology 101 Book'}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={`Provide more details about what you're ${type === 'request' ? 'looking for' : 'offering'}`}
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {type === 'offer' && (
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Used">Used</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium mb-4">Your Contact Information</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="studentEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="studentPhone"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="555-123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : `Post ${type.charAt(0).toUpperCase() + type.slice(1)}`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
