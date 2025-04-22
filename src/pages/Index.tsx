
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
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("browse-offers");
  const [requests, setRequests] = useState<Request[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { language, t } = useLanguage();

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Najran University Cycling</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t(language, "platformDescription")}
          </p>
          
          {/* AI Assistant CTA */}
          <div className="mt-6">
            <Link to="/ai-features">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <MessageSquare className="mr-2 h-5 w-5" />
                {t(language, "aiAssistant")} - {t(language, "tryNow")}
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs 
          defaultValue="browse-offers" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="post-request">{t(language, "postRequest")}</TabsTrigger>
            <TabsTrigger value="post-offer">{t(language, "postOffer")}</TabsTrigger>
            <TabsTrigger value="browse-requests">{t(language, "browseRequests")}</TabsTrigger>
            <TabsTrigger value="browse-offers">{t(language, "browseOffers")}</TabsTrigger>
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
      
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">© 2024 Campus Circle - {t(language, "connectingStudents")}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            {t(language, "platformDescription")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
