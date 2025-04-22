
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIChat } from "@/components/ai/AIChat";
import { useLanguage } from "@/context/LanguageContext";

const AIFeatures = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("student-support");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t(language, "aiFeatures")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t(language, "aiFeaturesDescription")}
          </p>
        </div>
        
        <Tabs 
          defaultValue="student-support" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="student-support">{t(language, "studentSupport")}</TabsTrigger>
            <TabsTrigger value="recommendations">{t(language, "recommendations")}</TabsTrigger>
            <TabsTrigger value="content-generation">{t(language, "contentGeneration")}</TabsTrigger>
            <TabsTrigger value="smart-search">{t(language, "smartSearch")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="student-support" className="min-h-[70vh]">
            <AIChat 
              chatType="studentSupport" 
              title="studentSupportTitle"
              placeholder="askAboutUniversity" 
            />
          </TabsContent>
          
          <TabsContent value="recommendations" className="min-h-[70vh]">
            <AIChat 
              chatType="recommendations" 
              title="recommendationsTitle"
              placeholder="askForRecommendations" 
            />
          </TabsContent>
          
          <TabsContent value="content-generation" className="min-h-[70vh]">
            <AIChat 
              chatType="contentGeneration" 
              title="contentGenerationTitle"
              placeholder="askForContent" 
            />
          </TabsContent>
          
          <TabsContent value="smart-search" className="min-h-[70vh]">
            <AIChat 
              chatType="smartSearch" 
              title="smartSearchTitle"
              placeholder="searchForResources" 
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Campus Circle - {t(language, "connectingStudents")}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            {t(language, "platformDescription")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIFeatures;
