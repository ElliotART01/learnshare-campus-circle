
import React from 'react';
import { Header } from '@/components/layout/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-center mb-8">About Najran University Cycling</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-primary-medium mb-3">Our Mission</h2>
              <p className="text-gray-700">
                Campus Circle aims to create a sustainable and supportive community of students by facilitating 
                the exchange of educational materials. We believe that by sharing resources, students can reduce 
                waste, save money, and build meaningful connections within their campus community.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-medium mb-3">How It Works</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-md p-4 bg-primary-light bg-opacity-20">
                  <h3 className="font-medium mb-2">For Those Who Need</h3>
                  <p className="text-sm text-gray-600">
                    Browse available offerings or post a specific request for materials you need for your courses.
                    Connect directly with the offerer to arrange pickup or exchange.
                  </p>
                </div>
                <div className="border rounded-md p-4 bg-primary-light bg-opacity-20">
                  <h3 className="font-medium mb-2">For Those Who Give</h3>
                  <p className="text-sm text-gray-600">
                    Post educational materials you no longer need, from textbooks to lab equipment.
                    Help fellow students while decluttering your space.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-medium mb-3">Our Values</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>
                  <span className="font-medium">Generosity:</span> We believe in the power of giving without expectation of monetary return.
                </li>
                <li>
                  <span className="font-medium">Sustainability:</span> By reusing educational materials, we reduce waste and environmental impact.
                </li>
                <li>
                  <span className="font-medium">Community:</span> We foster connections between students across different years and disciplines.
                </li>
                <li>
                  <span className="font-medium">Accessibility:</span> We make education more accessible by reducing the financial burden of materials.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-primary-medium mb-3">Guidelines</h2>
              <div className="bg-gray-50 rounded p-4">
                <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                  <li>Be respectful and honest in all exchanges.</li>
                  <li>Accurately describe the condition of materials you're offering.</li>
                  <li>Honor your commitments – if you arrange to meet, show up.</li>
                  <li>This platform is for educational materials only – no selling or trading of other items.</li>
                  <li>Report any inappropriate behavior or misuse of the platform.</li>
                </ol>
              </div>
            </section>
          </div>
        </div>
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

export default About;
