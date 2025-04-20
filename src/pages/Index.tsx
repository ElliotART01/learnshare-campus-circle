
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { ItemForm } from "@/components/forms/ItemForm";
import { RequestsList } from "@/components/sections/RequestsList";
import { OffersList } from "@/components/sections/OffersList";
import { mockRequests, mockOffers } from "@/data/mockData";
import { Request, Offer } from "@/types";
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [activeTab, setActiveTab] = useState("browse-offers");
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [offers, setOffers] = useState<Offer[]>(mockOffers);

  const handleFormSubmitSuccess = (data: any, type: 'request' | 'offer') => {
    const timestamp = new Date().toISOString();
    
    if (type === 'request') {
      const newRequest: Request = {
        id: uuidv4(),
        studentEmail: data.studentEmail,
        studentName: data.studentName,
        title: data.title,
        description: data.description,
        status: 'Open',
        timestamp: timestamp,
        imageUrl: data.imageUrl
      };
      
      setRequests(prevRequests => [...prevRequests, newRequest]);
      setActiveTab("browse-requests");
    } else if (type === 'offer') {
      const newOffer: Offer = {
        id: uuidv4(),
        studentEmail: data.studentEmail,
        studentName: data.studentName,
        title: data.title,
        description: data.description,
        condition: data.condition,
        status: 'Available',
        timestamp: timestamp,
        imageUrl: data.imageUrl
      };
      
      setOffers(prevOffers => [...prevOffers, newOffer]);
      setActiveTab("browse-offers");
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
