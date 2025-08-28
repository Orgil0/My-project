import { useEffect, useState } from "react";
import { parentService } from "../services/parentService";
import { type Parent } from "../types/Parent";
import { Link } from "react-router-dom";

const ParentList: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    fetchParents();
   
  }, []);
  

  const fetchParents = async () => {
    try {
      setLoading(true);
      const data = await parentService.getAllParents();
      setParents(data);
      console.log(data);
    } catch (err) {
      setError("Failed to fetch parents");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  
  

  const handleDelete = async (id: number) => {
    if(window.confirm('Are you sure you want to delete this parent?')){
      try {
        await parentService.deleteParent(id);
        await fetchParents(); // refreshing the parent list
      } catch (error) {
        setError('Failed to delete parent');
        console.error(error);
      }
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="parent-list">
      <div className="header">
        <h2>Parent Management</h2>
        <Link to="/parents/new" className="btn btn-primary">Add new Parent</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Relationship</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent) => (
            <tr key={parent.id}>
              <td>{parent.id}</td>
              <td>{`${parent.firstName} ${parent.lastName}`}</td>
              <td>{parent.relationship}</td>
              <td>{parent.phoneNumber}</td>
              <td>{parent.email}</td>
              <td>
                <Link to={`/parents/${parent.id}`} className="btn btn-sm btn-info">View</Link>
                <Link to={`/parents/${parent.id}/edit`} className="btn btn-sm btn-warning">Edit</Link>
                <button onClick={()=> handleDelete(parent.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default ParentList;
