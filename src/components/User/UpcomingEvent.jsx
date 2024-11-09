import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Calendar, DollarSign, ExternalLink, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const UpcomingEvents = () => {
  // Static campaign data
  const [campaigns] = useState([
    {
      id: 1,
      name: "Plant Trees Mumbai",
      motto: "Green Mumbai, Clean Mumbai",
      eventDate: "2024-12-15",
      time: "09:00 AM",
      donationRequired: 50000,
      donationCollected: 35000,
      participants: 120,
      location: {
        lng: 72.8777,
        lat: 19.0760
      },
      category: "Tree Planting",
      status: "Active"
    },
    {
      id: 2,
      name: "Beach Cleanup Drive",
      motto: "Save Our Oceans",
      eventDate: "2024-11-20",
      time: "07:30 AM",
      donationRequired: 25000,
      donationCollected: 20000,
      participants: 85,
      location: {
        lng: 72.8152,
        lat: 18.9217
      },
      category: "Cleanup",
      status: "Active"
    },
    {
      id: 3,
      name: "Solar Power Workshop",
      motto: "Sustainable Energy Future",
      eventDate: "2024-12-01",
      time: "10:00 AM",
      donationRequired: 75000,
      donationCollected: 45000,
      participants: 60,
      location: {
        lng: 77.2090,
        lat: 28.6139
      },
      category: "Education",
      status: "Upcoming"
    },
    {
      id: 4,
      name: "River Cleanup Project",
      motto: "Clean Water, Better Life",
      eventDate: "2024-11-25",
      time: "08:00 AM",
      donationRequired: 40000,
      donationCollected: 38000,
      participants: 150,
      location: {
        lng: 75.8577,
        lat: 22.7196
      },
      category: "Cleanup",
      status: "Active"
    }
  ]);

  const [viewState, setViewState] = useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4
  });

  const handleMapClick = (campaign) => {
    if (campaign.location) {
      const { lng, lat } = campaign.location;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    }
  };

  const calculateProgress = (collected, required) => {
    return Math.min((collected / required) * 100, 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const handleJoinClick=()=>{
    toast.success("Joined the campaign successfully!!")
  }

  return (
    <div className="container mx-auto p-4 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Environmental Campaigns
      </h1>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="events">Campaign Events</TabsTrigger>
          <TabsTrigger value="locations">Campaign Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-green-100 space-y-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-green-800 text-lg">{campaign.name}</CardTitle>
                    <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-green-600">
                    {campaign.motto}
                  </CardDescription>
                  <Badge variant="outline" className="w-fit">
                    {campaign.category}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-green-700">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formatDate(campaign.eventDate)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {campaign.time}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-green-700">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        {campaign.participants} joined
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        ₹{campaign.donationRequired.toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-green-700">
                        <span>Donations Progress</span>
                        <span>₹{campaign.donationCollected.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={calculateProgress(campaign.donationCollected, campaign.donationRequired)} 
                        className="h-2"
                      />
                      <p className="text-right text-xs text-green-600">
                        {calculateProgress(campaign.donationCollected, campaign.donationRequired)}% of target
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      className="text-green-700 border-green-300 hover:bg-green-100"
                      onClick={() => handleMapClick(campaign)}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      View Map
                    </Button>
                    <Button onClick={() => handleJoinClick()} className="bg-green-600 hover:bg-green-700">
                      Join Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0 space-y-4">
              <div className="rounded-lg overflow-hidden border border-green-200 shadow-lg">
                <Map
                  {...viewState}
                  onMove={evt => setViewState(evt.viewState)}
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                  style={{ width: '100%', height: '400px' }}
                  mapStyle="mapbox://styles/mapbox/outdoors-v11"
                >
                  {campaigns.map((campaign) => (
                    campaign.location && (
                      <Marker
                        key={campaign.id}
                        longitude={campaign.location.lng}
                        latitude={campaign.location.lat}
                        anchor="bottom"
                      >
                        <div 
                          className="cursor-pointer transform transition-transform hover:scale-110"
                          onClick={() => handleMapClick(campaign)}
                        >
                          <MapPin className="w-6 h-6 text-red-500" />
                        </div>
                      </Marker>
                    )
                  ))}
                </Map>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((campaign) => (
                  campaign.location && (
                    <Card key={campaign.id} className="bg-white hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-green-800">
                              {campaign.name}
                            </CardTitle>
                            <p className="text-sm text-green-600 mt-1">
                              {formatDate(campaign.eventDate)} at {campaign.time}
                            </p>
                          </div>
                          <Badge variant="outline">{campaign.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => handleMapClick(campaign)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open in Google Maps
                        </Button>
                      </CardContent>
                    </Card>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpcomingEvents;