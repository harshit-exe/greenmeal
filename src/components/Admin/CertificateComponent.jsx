import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Award, Download, Star, Loader2, Medal, Heart, Calendar, Shield, MapPin } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const QRCodePlaceholder = ({ value, size }) => (
  <div 
    className="flex items-center justify-center bg-white border-2 border-green-200 rounded-lg"
    style={{ width: size, height: size }}
  >
    <div className="text-xs text-center text-gray-500 p-2">
      QR Code: {value.substring(0, 20)}...
    </div>
  </div>
);

const CertificateComponent = ({ donation, onClose, dataDonor }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  console.log(dataDonor);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const generateCertificateNumber = () => {
    return `DCN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const generateVerificationUrl = (certNumber) => {
    return `https://yourapp.com/verify/${certNumber}`;
  };

  const uploadToCloudStorage = async (blob) => {
    try {
      // Simulated cloud upload - Replace with actual implementation
      const mockCdnUrl = `https://cdn.certificates.storage.com/${Date.now()}-${donation?.donor.replace(/\s+/g, '-')}.pdf`;
      return mockCdnUrl;
    } catch (error) {
      console.error('Error uploading to cloud storage:', error);
      throw error;
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    const certNumber = generateCertificateNumber();
    
    try {
      const certificateElement = document.querySelector('#certificate-container');
      
      const canvas = await html2canvas(certificateElement, {
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
      
      const pdfBlob = pdf.output('blob');
      const publicUrl = await uploadToCloudStorage(pdfBlob);
      
      const certificateData = {
        certificateNumber: certNumber,
        donorName: donation?.donor || dataDonor.username,
        ngoName: donation?.ngoName,
        items: donation?.items,
        generatedDate: currentDate,
        pdfUrl: publicUrl,
        verificationUrl: generateVerificationUrl(certNumber),
        metadata: {
          issuedBy: "Donation Management System",
          validFrom: currentDate,
          validUntil: "Perpetual",
          donationType: "In-Kind",
          impact: "Community Support",
          category: "Charitable Contribution"
        }
      };
      
      setCertificateData(certificateData);
      
      pdf.save(`${donation?.donor}-donation-certificate.pdf`);
      onClose();
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-2 sm:p-4 md:p-6 bg-white rounded-xl">
      <div 
        id="certificate-container" 
        className="aspect-[1.4142/1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-50 via-white to-green-50 p-6 sm:p-8 md:p-10 rounded-lg shadow-2xl border-[12px] border-double border-green-200 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')] opacity-10"></div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-green-600 rounded-tl-xl opacity-50" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-green-600 rounded-tr-xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-green-600 rounded-bl-xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-green-600 rounded-br-xl opacity-50" />

        {/* Certificate Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                <Award className="w-28 h-28 text-green-600 filter drop-shadow-lg" />
                <div className="absolute inset-0 animate-pulse opacity-50">
                  <Award className="w-28 h-28 text-yellow-400 transform scale-110" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-green-800 font-serif tracking-wide">
                Certificate of Excellence
              </h1>
              <div className="flex justify-center gap-3 items-center text-green-700">
                <Medal className="w-5 h-5" />
                <h2 className="text-xl font-medium">Outstanding Charitable Contribution</h2>
                <Medal className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="w-8 h-8 fill-yellow-400 text-yellow-400 drop-shadow-md" />
            ))}
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6 mb-8">
            <div>
              <p className="text-lg text-gray-700 mb-2">This certificate is proudly presented to</p>
              <h3 className="text-3xl font-bold text-green-700 font-serif tracking-wide mb-1">
             "   {dataDonor?.userName}"
              </h3>
              <div className="flex justify-center items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">Location: {donation?.location || "Local Community"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-lg text-gray-700">for their exceptional generosity and commitment to</p>
              <h4 className="text-2xl font-bold text-green-700 font-serif">{donation?.ngoName}</h4>
              <div className="flex justify-center items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <p className="text-base text-gray-600">Making a Difference in Our Community</p>
                <Heart className="w-5 h-5 text-red-500" />
              </div>
            </div>

            <div>
              <p className="text-lg text-gray-700 mb-3">through their valuable contribution of</p>
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                {donation?.items?.map((item, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-base font-semibold shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto">
            <div className="flex justify-between items-end px-12 mb-6">
              <div className="text-center">
                <div className="w-40 border-t-2 border-green-600"></div>
                <p className="text-sm text-gray-600 mt-1">NGO Representative</p>
              </div>
              
              <div className="relative">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-full h-full text-green-200" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <QRCodePlaceholder 
                      value={generateVerificationUrl(generateCertificateNumber())}
                      size={80}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">Scan to Verify</p>
              </div>
              
              <div className="text-center">
                <div className="w-40 border-t-2 border-green-600"></div>
                <p className="text-sm text-gray-600 mt-1">Authorized Signatory</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex justify-center items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4" />
                <p className="text-base">Issued on {currentDate}</p>
              </div>
              <p className="text-sm text-gray-500">Certificate Number: {generateCertificateNumber()}</p>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Award className="w-[40rem] h-[40rem] transform rotate-12" />
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Certificate...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Download Certificate
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CertificateComponent;