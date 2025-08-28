import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Child, Parent } from "../types/Parent";
import { parentService } from "../services/parentService";

const ParentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const [parent, setParent] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [Children, setChildren] = useState<Child[]>([]);
  useEffect(() => {
    console.log('id');
    if (id) {
      console.log('fetching parent');
      fetchParent(parseInt(id));
      fetchChildren(parseInt(id));
    }
  }, [id])
  const fetchChildren = async (parentId: number) => {
    try {
      setLoading(true);
      const data = await parentService.getParentChildren(parentId);
      console.log(data);
      setChildren(data);
    } catch (error) {
      setError('Failed to fetch parent details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const fetchParent = async (parentId: number) => {
    try {
      setLoading(true);
      const data = await parentService.getParentById(parentId);
      console.log(data);
      setParent(data);
    } catch (error) {
      setError('Failed to fetch parent details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!parent) return <div>Parent not found</div>

  return (
    <div className="parent-detail">
      <div className="header">
        <h2>Parent Details</h2>
        <Link to="/parents" className="btn btn-secondary">
          Back to List
        </Link>
      </div>
      <div className="parent-info">
        <h3>{`${parent.firstName} ${parent.lastName}`}</h3>
        <p><strong>ID:</strong> {parent.id}</p>
        <p><strong>Relationship: </strong>{parent.relationship}</p>
        <p><strong>Phone: </strong>{parent.phoneNumber}</p>
        <p><strong>Email: </strong>{parent.email}</p>
        <p><strong>Address:</strong>{parent.address || 'N/A'}</p>
        <p><strong>Number of children: </strong>{parent.childCount || 0}</p>
      </div>
      <div className="child-list">
        <div className="header">
          <h2>Children</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of birth</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {Children.map((child) => (
              <ul key={child.id}>
                <li>{child.id}</li>
                <li>{`${child.firstName} ${child.lastName}`}</li>
                <li>{child.dateOfBirth}</li>
                <li>{child.gender}</li>
              </ul>
            ))}
          </tbody>
        </table>
      </div>
      <div className="actions">
        <Link to={`/parents/${parent.id}/edit`} className="btn btn-warning">Edit</Link>
      </div>
    </div>
    
  );
};

export default ParentDetail;
