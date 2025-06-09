import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

import uploadRoutes from './upload';
import { db } from './firebaseAdmin';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Upload routes
app.use('/api', uploadRoutes);

// ✅ Add new vehicle
app.post('/api/admin/add-vehicle', async (req: Request, res: Response) => {
  try {
    const {
      make, model, year, price, mileage, fuelType, transmission, engineSize,
      color, features, description, bodyType, condition, images
    } = req.body;

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const vehicleData = {
      make,
      model,
      year: Number(year),
      price: Number(price),
      mileage: Number(mileage),
      fuelType,
      transmission,
      engineSize,
      color,
      features: typeof features === 'string' ? features.split(',').map(f => f.trim()) : features,
      description,
      bodyType,
      condition: condition || 'used',
      sold: false,
      images,
    };

    const result = await db.collection('vehicles').add(vehicleData);
    res.status(201).json({ id: result.id });
  } catch (err) {
    console.error("❌ Firestore Error:", err);
    res.status(500).json({ error: 'Failed to save vehicle' });
  }
});

// ✅ Get all vehicles — FRONTEND EXPECTS THIS
app.get('/api/admin/vehicles', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('vehicles').get();
    const vehicles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(vehicles);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// ✅ Google Reviews
app.get('/api/google-reviews', async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: 'ChIJacPtUmWJyIkRDCwymLIfASY',
        fields: 'name,rating,reviews',
        key: 'AIzaSyDIF4xN9RDsW95v21Op7VOMYAKVMuQeX2g',
      },
    });

    const reviews = response.data.result?.reviews || [];
    const fiveStar = reviews.filter((r: any) => r.rating === 5);
    res.json(fiveStar);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// ✅ Delete vehicle
app.delete('/api/admin/delete-vehicle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('vehicles').doc(id).delete();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
});

// ✅ Mark vehicle as sold
app.patch('/api/admin/mark-sold/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('vehicles').doc(id).update({ sold: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark vehicle as sold' });
  }
});

// ✅ Update vehicle
app.patch('/api/admin/update-vehicle/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    await db.collection('vehicles').doc(id).update(data);
    res.status(200).json({ message: 'Vehicle updated successfully' });
  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
