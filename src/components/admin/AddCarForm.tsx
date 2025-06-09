import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useLocation } from 'react-router-dom';
import { Plus, Upload } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/authContext';
import { Vehicle } from '../../types';


const fallbackImage = 'https://via.placeholder.com/400x300?text=No+Image';

interface AddCarFormData {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  color: string;
  images: FileList;
  features: string;
  description: string;
  bodyType: string;
}
const AddCarForm: React.FC = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const editData = location.state?.editData;
  const isEditMode = !!editData; // ✅ Add this line here


  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddCarFormData>();

  useEffect(() => {
    if (editData) {
      setValue("make", editData.make);
      setValue("model", editData.model);
      setValue("year", Number(editData.year));
      setValue("price", Number(editData.price));
      setValue("mileage", Number(editData.mileage));
      setValue("fuelType", editData.fuelType);
      setValue("transmission", editData.transmission);
      setValue("engineSize", editData.engineSize);
      setValue("color", editData.color);
      setValue("features", Array.isArray(editData.features) ? editData.features.join(", ") : editData.features);
      setValue("description", editData.description);
      setValue("bodyType", editData.bodyType);
      if (editData.images) {
        setPreviewImages(editData.images);
      }
    }
  }, [editData, setValue]);



  const handleImageUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
     const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
  method: "POST",
  body: formData,
});


      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const data = await res.json();
      return data.imageUrl;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

const onSubmit = async (data: AddCarFormData) => {
 const files = Array.from(data.images); // FileList -> array
const uploadedUrls: string[] = [];

if (files.length === 0) {
  alert("Please select at least one image");
  return;
}

// ✅ Upload all selected files
for (const file of files) {
  const uploadedUrl = await handleImageUpload(file);
  if (!uploadedUrl) {
    alert("Image upload failed");
    return;
  }
  uploadedUrls.push(uploadedUrl);
}

const vehicleData = {
  make: data.make,
  model: data.model,
  year: Number(data.year),
  price: Number(data.price),
  mileage: Number(data.mileage),
  fuelType: data.fuelType,
  transmission: data.transmission,
  engineSize: data.engineSize,
  color: data.color,
  features: data.features.split(",").map((f) => f.trim()),
  description: data.description,
  bodyType: data.bodyType,
  condition: "used",
  sold: false,
  images: uploadedUrls, // ✅ store all uploaded image URLs
};

 try {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (isEditMode && editData?.id) {
    // UPDATE logic
    const res = await fetch(`${baseUrl}/api/admin/update-vehicle/${editData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleData),
    });

    if (!res.ok) throw new Error("Update failed");

    alert("✅ Vehicle updated successfully!");
  } else {
    // ADD logic
    const res = await fetch(`${baseUrl}/api/admin/add-vehicle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleData),
    });

    if (!res.ok) throw new Error("Add failed");

    alert("✅ Vehicle added successfully!");
  }
} catch (err) {
  console.error("❌ Error saving vehicle:", err);
  alert("❌ Failed to save vehicle");
}

};

  const onDrop = (acceptedFiles: File[]) => {
    const urls = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(urls);

    const dataTransfer = new DataTransfer();
    acceptedFiles.forEach(file => dataTransfer.items.add(file));
    setValue("images", dataTransfer.files, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  if (!isAdmin) {
    return (
      <div className="text-center py-12 text-red-600 font-semibold">
        You are not authorized to access this page.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Pre-owned Vehicle</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Make" name="make" register={register} errors={errors} required />
          <InputField label="Model" name="model" register={register} errors={errors} required />
          <InputField
            label="Year"
            name="year"
            type="number"
            register={register}
            errors={errors}
            required
            options={{
              min: { value: 1900, message: 'Year must be after 1900' },
              max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' },
            }}
          />
          <InputField
            label="Price"
            name="price"
            type="number"
            register={register}
            errors={errors}
            required
            options={{
              min: { value: 0, message: 'Price must be positive' },
            }}
          />
          <InputField
            label="Mileage"
            name="mileage"
            type="number"
            register={register}
            errors={errors}
            required
            options={{
              min: { value: 0, message: 'Mileage must be positive' },
            }}
          />
          <SelectField label="Fuel Type" name="fuelType" register={register} errors={errors} required options={["Gasoline", "Diesel", "Electric", "Hybrid"]} />
          <SelectField label="Transmission" name="transmission" register={register} errors={errors} required options={["Automatic", "Manual", "CVT"]} />
          <InputField label="Engine Size" name="engineSize" register={register} errors={errors} required placeholder="e.g., 2.0L" />
          <InputField label="Color" name="color" register={register} errors={errors} required />
          <SelectField label="Body Type" name="bodyType" register={register} errors={errors} required options={["Sedan", "SUV", "Coupe", "Hatchback", "Wagon", "Van", "Truck"]} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Features (comma-separated)
          </label>
          <textarea
            {...register('features', { required: 'Features are required' })}
            placeholder="Leather Seats, Navigation System, Sunroof..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.features && (
            <p className="mt-1 text-sm text-red-600">{errors.features.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Vehicle Images
  </label>

  <div
    {...getRootProps()}
    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
  >
   <input
  {...getInputProps({
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setValue("images", e.target.files as FileList); // store in RHF

        // Multiple preview images
        const previews: string[] = [];

        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            previews.push(reader.result as string);
            // Update state after all previews loaded
            if (previews.length === files.length) {
              setPreviewImages(previews);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    },
  })}
  accept="image/*"
  multiple // ✅ this is important
/>


    <div className="space-y-1 text-center">
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <div className="text-sm text-gray-600">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>
              <span className="text-blue-600 font-medium">Upload files</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
          </>
        )}
      </div>
    </div>
  </div>

  {/* Image Preview */}
  {previewImages.length > 0 && (
    <img
      src={previewImages[0]}
      alt="Preview"
      className="mt-4 w-48 h-32 object-cover rounded shadow"
    />
  )}

  {/* Validation error */}
  {errors.images && (
    <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
  )}
</div>


        {previewImages.length > 0 && (
         <div className="flex flex-wrap gap-3 mt-4">
  {previewImages.map((src, index) => (
    <div key={index} className="w-32 h-32 border rounded overflow-hidden shadow-sm">
      <img
        src={src}
        alt={`Preview ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>

        )}

        <div className="flex justify-end">
          <Button type="submit" icon={<Plus className="w-4 h-4" />}>
            Add Vehicle
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;

// Helper components for cleaner inputs
const InputField = ({ label, name, register, errors, type = "text", required = false, options = {}, placeholder = "" }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { required: required ? `${label} is required` : false, ...options })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>}
  </div>
);

const SelectField = ({ label, name, register, errors, required = false, options = [] }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      {...register(name, { required: required ? `${label} is required` : false })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>}
  </div>
);
