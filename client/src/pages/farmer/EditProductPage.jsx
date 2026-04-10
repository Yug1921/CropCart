"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  updateProduct,
  resetProductSuccess,
} from "../../redux/slices/productSlice";
import { getCategories } from "../../redux/slices/categorySlice";
import Loader from "../../components/Loader";
import { FaArrowLeft, FaUpload, FaTimes } from "react-icons/fa";

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, success } = useSelector((state) => state.products);
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unit: "lb",
    quantityAvailable: "",
    images: [],
    tags: "",
    isOrganic: false,
    harvestDate: "",
    availableUntil: "",
    isActive: true,
  });

  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [errors, setErrors] = useState({});

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category?._id || "",
        price: product.price || "",
        unit: product.unit || "lb",
        quantityAvailable: product.quantityAvailable || "",
        images: product.images || [],
        tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
        isOrganic: product.isOrganic || false,
        harvestDate: product.harvestDate
          ? new Date(product.harvestDate).toISOString().split("T")[0]
          : "",
        availableUntil: product.availableUntil
          ? new Date(product.availableUntil).toISOString().split("T")[0]
          : "",
        isActive: product.isActive !== undefined ? product.isActive : true,
      });
      setImagePreviewUrls(product.images || []);
    }
  }, [product]);

  useEffect(() => {
    if (success) {
      dispatch(resetProductSuccess());
      navigate("/farmer/products");
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const newImageDataUrls = await Promise.all(
        files.map((file) => readFileAsDataUrl(file))
      );

      setImagePreviewUrls((prev) => [...prev, ...newImageDataUrls]);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImageDataUrls],
      }));
      e.target.value = "";
    } catch {
      setErrors((prev) => ({
        ...prev,
        images: "Unable to process one or more images. Please try again.",
      }));
    }
  };

  const removeImage = (index) => {
    const newImagePreviewUrls = [...imagePreviewUrls];
    const newImages = [...formData.images];
    newImagePreviewUrls.splice(index, 1);
    newImages.splice(index, 1);
    setImagePreviewUrls(newImagePreviewUrls);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (!formData.quantityAvailable || formData.quantityAvailable < 0)
      newErrors.quantityAvailable = "Valid quantity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(
        updateProduct({
          id,
          productData: {
            ...formData,
            tags: formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          },
        })
      );
    }
  };

  if (loading || categoriesLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">Product not found</span>
        </div>
        <Link
          to="/farmer/products"
          className="mt-4 inline-block text-green-500 hover:text-green-700"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/farmer/products"
        className="flex items-center text-green-500 hover:text-green-700 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Products
      </Link>

      <div className="glass p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "border-red-500" : ""}`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category*
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-input ${
                  errors.category ? "border-red-500" : ""
                }`}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`form-input ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Describe your product..."
              required
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price*
              </label>
              <div className="flex items-stretch overflow-hidden rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-amber-700 focus-within:border-transparent">
                <span className="inline-flex items-center px-3 bg-stone-100 text-stone-600 border-r border-gray-300">
                  Rs
                </span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 focus:outline-none ${
                    errors.price ? "border-red-500" : ""
                  }`}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="unit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Unit*
              </label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className={`form-input ${errors.unit ? "border-red-500" : ""}`}
                required
              >
                <option value="lb">Pound (lb)</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="oz">Ounce (oz)</option>
                <option value="g">Gram (g)</option>
                <option value="each">Each</option>
                <option value="bunch">Bunch</option>
                <option value="dozen">Dozen</option>
                <option value="pint">Pint</option>
                <option value="quart">Quart</option>
                <option value="gallon">Gallon</option>
              </select>
              {errors.unit && (
                <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="quantityAvailable"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity Available*
              </label>
              <input
                type="number"
                id="quantityAvailable"
                name="quantityAvailable"
                value={formData.quantityAvailable}
                onChange={handleChange}
                className={`form-input ${
                  errors.quantityAvailable ? "border-red-500" : ""
                }`}
                min="0"
                required
              />
              {errors.quantityAvailable && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.quantityAvailable}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input pl-3"
              placeholder="fresh, organic, seasonal"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate tags with commas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-start">
            <div>
              <label
                htmlFor="harvestDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Harvest Date
              </label>
              <input
                type="date"
                id="harvestDate"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label
                htmlFor="availableUntil"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Available Until
              </label>
              <input
                type="date"
                id="availableUntil"
                name="availableUntil"
                value={formData.availableUntil}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="bg-[#fbf7ef] border border-stone-200 rounded-xl p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="checkbox"
                  id="isOrganic"
                  name="isOrganic"
                  checked={formData.isOrganic}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isOrganic"
                  className="flex-1 block text-sm text-gray-900"
                >
                  Organic
                </label>
              </div>
              <div className="flex items-center justify-between gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="flex-1 block text-sm text-gray-900"
                >
                  Active
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Use Active to hide inactive stock from buyers.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-4 py-2 hover:bg-stone-50 transition">
                <FaUpload className="text-stone-500" />
                <span>Upload Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                Upload up to 5 images
              </span>
            </div>
            {errors.images && (
              <p className="text-red-500 text-xs mt-2">{errors.images}</p>
            )}

            {imagePreviewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm"
                  >
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1.5 hover:bg-black"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              to="/farmer/products"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
