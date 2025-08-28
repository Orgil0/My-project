import React, { useEffect, useState } from "react";
import type { ParentFormData } from "../types/Parent";
import { parentService } from "../services/parentService";
import { useNavigate, useParams } from "react-router-dom";

const ParentForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [formData, setFormData] = useState<ParentFormData>({
    firstName: "",
    lastName: "",
    relationship: "Father",
    phoneNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (isEdit && id) {
      fetchParent(parseInt(id));
    }
  }, [id, isEdit]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit && id) {
        await parentService.updateParent(parseInt(id), formData);
      } else {
        await parentService.createParent(formData);
      }
      navigate("/parents");
    } catch (error) {
      setError("Failed to create Parent");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParent = async (parentId: number) => {
    try {
      setLoading(true);
      const data = await parentService.getParentById(parentId);
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        relationship: data.relationship,
        phoneNumber: data.phoneNumber || "",
        email: data.email || "",
        address: data.address || "",
      });
    } catch (error) {
      setError("Failed to fetch parent details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) return <div>Loading...</div>;

  return (
    <div className="parent-form">
      <h2>{isEdit ? "Edit Parent" : "Add New Parent"}</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="relationship">Relationship *</label>
          <select
            name="relationship"
            id="relationship"
            value={formData.relationship}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Guardian">Guardian</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParentForm;
