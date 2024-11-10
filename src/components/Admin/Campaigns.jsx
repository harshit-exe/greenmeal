import React, { useState, useRef, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Leaf, Calendar, MapPin, DollarSign, Send, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const MapboxMap = ({ onLocationSelect }) => {
  const [viewState, setViewState] = useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4
  });
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleClick = (event) => {
    const { lngLat } = event;
    const newPosition = { lng: lngLat.lng, lat: lngLat.lat };
    setMarkerPosition(newPosition);
    onLocationSelect(newPosition);
  };

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      mapboxAccessToken='pk.eyJ1IjoiaGFyc2hpdDEyMTgiLCJhIjoiY20zYW5yOWtnMTc2aDJzc2Y2dzRid2x2byJ9.ha_nwb8ouQ-8ioMCDkGzqw'
      style={{ width: '100%', height: '300px' }}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onClick={handleClick}
      latitude={19.1136}
      longitude={72.8777}
      className="rounded-md overflow-hidden"
      zoom={12}
    >
      {markerPosition && (
        <Marker
          longitude={markerPosition.lng}
          latitude={markerPosition.lat}
          anchor="bottom"
        >
          <MapPin className="w-6 h-6 text-red-500" />
        </Marker>
      )}
    </Map>
  );
};

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    motto: '',
    donationRequired: '',
    eventDate: '',
    location: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (location) => {
    setNewCampaign(prev => ({ ...prev, location }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCampaignData = { 
      ...newCampaign, 
      id: Date.now(), 
      donationCollected: Math.floor(Math.random() * parseInt(newCampaign.donationRequired)) // Simulated donation amount
    };
    setCampaigns(prev => [...prev, newCampaignData]);
    setNewCampaign({ name: '', motto: '', donationRequired: '', eventDate: '', location: null });
    console.log(newCampaign);
    
    setIsDialogOpen(false);
    toast.success('Campaign created successfully!');
  };


  const handleTotalDonation = (campaign) => {
    const donationPercentage = ((campaign.donationCollected / campaign.donationRequired) * 100).toFixed(1);
    toast(
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Donation Progress</p>
        <div className="flex items-center gap-2">
          <span>₹{campaign.donationCollected.toLocaleString()}</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${Math.min(donationPercentage, 100)}%` }}
            ></div>
          </div>
          <span>{donationPercentage}%</span>
        </div>
      </div>
    );

    // Update the campaign's button text temporarily
    const campaignIndex = campaigns.findIndex(c => c.id === campaign.id);
    if (campaignIndex !== -1) {
      const updatedCampaigns = [...campaigns];
      updatedCampaigns[campaignIndex] = {
        ...campaign,
        showingDonation: true
      };
      setCampaigns(updatedCampaigns);
      
      // Reset after 3 seconds
      setTimeout(() => {
        const resetCampaigns = [...updatedCampaigns];
        resetCampaigns[campaignIndex] = {
          ...campaign,
          showingDonation: false
        };
        setCampaigns(resetCampaigns);
      }, 3000);
    }
  };
  
  const handleSendEventLocation = (campaign) => {
    if (campaign.location) {
      const { lng, lat } = campaign.location;
      const locationObject = {
        campaignName: campaign.name,
        coordinates: {
          longitude: lng,
          latitude: lat
        },
        googleMapsLink: `https://www.google.com/maps?q=${lat},${lng}`,
        googleMapsEmbedLink: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2s!4v1!5m2!1sen!2s`,
        osmLink: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`,
        formattedText: `${campaign.name} is located at: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
      };
      
      // Copy the Google Maps link to clipboard
      navigator.clipboard.writeText(locationObject.googleMapsLink).then(() => {
        toast.success("Location link copied to clipboard!", {
          description: "You can now share the campaign location.",
          duration: 3000,
        });
      });

      return locationObject;
    } else {
      toast.error("No Location Set", {
        description: `No location has been set for campaign: ${campaign.name}`,
        duration: 3000,
      });
      return null;
    }
  };

  const handleSendAlertToDonors = (campaign) => {
    const eventDetails = [
      campaign.name,
      campaign.motto,
      campaign.eventDate,
      campaign.location ? `Longitude ${campaign.location.lng}, Latitude ${campaign.location.lat}` : 'Location not set'
    ];
    
    toast.success("Alert sent to donors!", {
      description: `Notification sent for campaign: ${campaign.name}`,
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto p-4 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
        <Leaf className="mr-2" /> Eco-Friendly Campaigns
      </h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-green-600 hover:bg-green-700">Create New Campaign</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[90%] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>Fill in the details for your new eco-friendly campaign.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" name="name" value={newCampaign.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="eventDate">Event Date</Label>
                <Input id="eventDate" name="eventDate" type="date" value={newCampaign.eventDate} onChange={handleInputChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="motto">Motto</Label>
              <Textarea id="motto" name="motto" value={newCampaign.motto} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="donationRequired">Donation Required (₹)</Label>
              <Input id="donationRequired" name="donationRequired" type="number" value={newCampaign.donationRequired} onChange={handleInputChange} required />
            </div>
            <div>
              <Label>Event Location (Click on the map)</Label>
              <MapboxMap onLocationSelect={handleLocationSelect} />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Create Campaign</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="w-full bg-white shadow-lg rounded-lg overflow-hidden border border-green-200">
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800 text-lg">{campaign.name}</CardTitle>
              <CardDescription className="text-green-600 text-sm">{campaign.motto}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <p className="flex items-center mb-2 text-green-700 text-sm">
                <DollarSign className="mr-2 h-4 w-4" /> Required: ₹{parseInt(campaign.donationRequired).toLocaleString()}
              </p>
              <p className="flex items-center mb-2 text-green-700 text-sm">
                <Calendar className="mr-2 h-4 w-4" /> Date: {campaign.eventDate}
              </p>
              <p className="flex items-center mb-4 text-green-700 text-sm">
                <MapPin className="mr-2 h-4 w-4" /> Location: {campaign.location ? `${campaign.location.lng.toFixed(4)}, ${campaign.location.lat.toFixed(4)}` : 'Not set'}
              </p>
            </CardContent>
            <CardFooter className="bg-green-50 p-2 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleTotalDonation(campaign)} 
                className="text-green-700 border-green-300 hover:bg-green-100 text-xs min-w-24"
              >
                {campaign.showingDonation ? (
                  `₹${campaign.donationCollected.toLocaleString()}`
                ) : (
                  <>
                    <DollarSign className="mr-1 h-3 w-3" /> Total Donation
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleSendEventLocation(campaign)} 
                className="text-green-700 border-green-300 hover:bg-green-100 text-xs"
              >
                <Send className="mr-1 h-3 w-3" /> Send Location
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleSendAlertToDonors(campaign)} 
                className="text-green-700 border-green-300 hover:bg-green-100 text-xs"
              >
                <Bell className="mr-1 h-3 w-3" /> Alert Donors
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignPage;