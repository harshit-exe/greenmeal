import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, Minus, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BaseApiUrl } from '@/utils/constanst'

const ProductTable = ({ products, onEdit, onQuantityChange }) => (
  <Card className="mt-6 bg-white border border-green-100">
    <CardHeader>
      <CardTitle className="text-green-700">Product Inventory</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-green-700">Name</TableHead>
              <TableHead className="text-green-700">MRP</TableHead>
              <TableHead className="text-green-700">Type</TableHead>
              <TableHead className="text-green-700">Expiry Date</TableHead>
              <TableHead className="text-green-700">Quantity</TableHead>
              <TableHead className="text-green-700">Image</TableHead>
              <TableHead className="text-green-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.itemName}</TableCell>
                <TableCell>₹{product.mrp.toLocaleString('en-IN')}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{new Date(product.Expirydate).toLocaleDateString('en-IN')}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                
                    <span>{product.Quantity}</span>
                 
                  </div>
                </TableCell>
                <TableCell>
                  {product.Imageurl && (
                    <img src={product.Imageurl} alt={product.itemName} className="w-16 h-16 object-cover rounded" />
                  )}
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
)
const ProductForm = ({ product, addProduct, updateProduct, setIsDialogOpen, openCamera, productImage,userData }) => {

  const [formData, setFormData] = useState(product || {
    name: '',
    mrp: '',
    type: '',
    expiryDate: '',
    quantity: '',
    image: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {

      console.log(productImage);
      console.log(formData);





      const data = new FormData();

      data.append("file", productImage);
      data.append("upload_preset", "kfdvzoaz");
      data.append("cloud_name", "dggd6cvzh");


      const res = await fetch('https://api.cloudinary.com/v1_1/dggd6cvzh/image/upload', {
        method: "POST",
        body: data
      })
      const cloudData = await res.json();


      const response = await fetch(`${BaseApiUrl}/inventory/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemName: formData.name, userid: userData?.user?.id, Expirydate: formData.expiryDate, Imageurl: cloudData.url,
          mrp: formData.mrp, Quantity: formData.quantity, type: formData.type
        })
      });

      const json = await response.json();

      console.log('everything is fine', json ,userData);
      router.push("/")




    } catch (error) {
      console.error('Error submitting product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-green-600">Product Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border-green-300 focus:border-green-500"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mrp" className="text-green-600">MRP (₹)</Label>
        <Input
          id="mrp"
          type="number"
          value={formData.mrp}
          onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
          className="border-green-300 focus:border-green-500"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type" className="text-green-600">Type</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
          <SelectTrigger className="border-green-300 focus:border-green-500">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fruits">Fruits</SelectItem>
            <SelectItem value="Vegetables">Vegetables</SelectItem>
            <SelectItem value="Dairy">Dairy</SelectItem>
            <SelectItem value="Bakery">Bakery</SelectItem>
            <SelectItem value="Canned Goods">Canned Goods</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiryDate" className="text-green-600">Expiry Date</Label>
        <Input
          id="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          className="border-green-300 focus:border-green-500"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-green-600">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="border-green-300 focus:border-green-500"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="productImage" className="text-green-600">Product Image</Label>
        <div className="flex items-center space-x-2">
          <Button type="button" onClick={() => openCamera()} className="bg-green-600 hover:bg-green-700">
            {formData.image ? 'Retake Product Image' : 'Take Product Image'}
          </Button>
          {(formData.image || productImage) && (
            <img src={formData.image || productImage} alt="Product" className="w-16 h-16 object-cover rounded" />
          )}
        </div>
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {product ? 'Updating Product...' : 'Adding Product...'}
          </>
        ) : (
          product ? 'Update Product' : 'Add Product'
        )}
      </Button>
    </form>
  )
}

const Inventory = ({userData}) => {
  const [products, setProducts] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    // Simulating API call to fetch products
    const fetchProducts = async () => {
      try {

        const response = await fetch(`${BaseApiUrl}/inventory/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "userid":userData?.user?.id
          },
        
        })
        const json = await response.json()

        console.log(json,"userdata or lasdkfjadf",userData?.user);
        setProducts(json.resume)
       


      
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()



  }, [])

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now(), image: capturedImage }
    setProducts([...products, newProduct])
    // Here you would also make an API call to add the product to the backend
    setCapturedImage(null)
  }

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
    // Here you would also make an API call to update the product in the backend
  }

  const handleQuantityChange = (id, change) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newQuantity = Math.max(0, p.quantity + change)
        // Here you would also make an API call to update the quantity in the backend
        return { ...p, quantity: newQuantity }
      }
      return p
    }))
  }

  const openCamera = async (type) => {

    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          // facingMode: { exact: 'environment' }, // Requests the back camera
          facingMode: { exact: 'user' }, // Requests the back camera
        },
      });

      // Set the video stream to the video element
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    const photoUrl = canvas.toDataURL('image/jpeg')

    setCapturedImage(photoUrl)
    console.log("Captured image (simulating backend send):", photoUrl)

    closeCamera()
  }

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
    }
    setIsCameraOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-7xl mx-auto bg-green-50"
    >
      <h1 className="text-3xl font-bold text-green-700 mb-6">Eco-Friendly Inventory Management</h1>

      <Button onClick={() => { setIsDialogOpen(true); setEditingProduct(null) }} className="mb-4 bg-green-600 hover:bg-green-700">
        Add New Product
      </Button>

      <AnimatePresence>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProductTable
            products={products}
            onEdit={(product) => { setEditingProduct(product); setIsDialogOpen(true) }}
            onQuantityChange={handleQuantityChange}
          />
        </motion.div>
      </AnimatePresence>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-green-700">{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <ProductForm
          userData={userData}
            product={editingProduct}
            addProduct={addProduct}
            updateProduct={updateProduct}
            setIsDialogOpen={setIsDialogOpen}
            openCamera={openCamera}
            productImage={capturedImage}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isCameraOpen} onOpenChange={closeCamera}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-green-700">Take Product Photo</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <video ref={videoRef} className="w-full h-auto" />
            <Button onClick={capturePhoto} className="mt-4 w-full bg-green-600 hover:bg-green-700">
              Capture Photo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  )
}

export default Inventory