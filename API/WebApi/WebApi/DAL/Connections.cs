using System.Data;
using System.Data.SqlClient;

namespace WebApi.Models
{
   

    public class Connections
    {
        public readonly string _connectionString;
        public  Connections(string connectionString)
        {
            _connectionString = connectionString;
        }
        private SqlConnection con;
        public void connections()
        {
            con = new SqlConnection(_connectionString);
        }
        public List<employees> GetEmployees()
        {
            connections();
            List<employees> list = new List<employees>();
            SqlCommand cmd = new SqlCommand("SelectEmployee", con);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            con.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                list.Add(new employees()
                {
                    EmployeeID = Convert.ToInt32(dr["EmployeeID"]),
                    Name = $"{dr["Name"]}",
                    Email = $"{dr["Email"]}",
                    phone = $"{dr["Phone"]}",
                });
               

            }
            con.Close();
            return list;
        }
        public int Add(employees emp)
        {
            connections();
            SqlCommand cmd = new SqlCommand("InsertUpdateEmployee", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("EmployeeID", emp.EmployeeID);
            cmd.Parameters.AddWithValue("Name", emp.Name);
            cmd.Parameters.AddWithValue("Email", emp.Email);
            cmd.Parameters.AddWithValue("Phone", emp.phone);
            cmd.Parameters.AddWithValue("Action", "Insert");
            con.Open();
            var newitem = cmd.ExecuteScalar();

            return Convert .ToInt32(newitem);
        
        }
        public bool Update(employees employee)
        {
            connections();
            SqlCommand cmd = new SqlCommand("InsertUpdateEmployee", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("EmployeeID", employee.EmployeeID);
            cmd.Parameters.AddWithValue("name", employee.Name);
            cmd.Parameters.AddWithValue("email", employee.Email);
            cmd.Parameters.AddWithValue("Phone", employee.phone);
            cmd.Parameters.AddWithValue("Action", "Update");
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i >= 0) return true;
            else return false;

        }
        public string Delete(int id)
        {
            connections();
            SqlCommand cmd = new SqlCommand("DeleteEmployee", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("EmployeeID", id);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i >= 0) return "Deleted Successfully";
            else return "Not Deleted";
        }
    }
}

