using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Cylsys.Common
{
    public class DbCommonHelper
    {
        string strcon = ConfigurationManager.ConnectionStrings["DatabaseConnection"].ToString();

        List<RecordException> ERROR_LIST = new List<RecordException>();
       // SqlTransaction trans;

        
      
        public string Save(string ProcedureName, SqlParameter[] paramenters)
        {
            string MSG = string.Empty;
            DataTable dt = new DataTable();
            string Response = string.Empty;
            using (SqlConnection conn = new SqlConnection(strcon))
            {
               // try
              //  {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand(ProcedureName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (paramenters != null)
                            cmd.Parameters.AddRange(paramenters);
                        object o = cmd.ExecuteScalar();
                        if (o != null)
                        {
                            Response = o.ToString();
                        }
                    }
              //  }
               // catch (Exception ex)
             //   {
               //     Response = MessageHelper.Fail;
              //  }
                return Response;
            }
        }

       
        public DataTable ExecuteParaQuery(string cQuery, SqlParameter[] paramenters)
        {
            DataTable dt = new DataTable();
            using (SqlConnection conn = new SqlConnection(strcon))
            {
                try
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(cQuery))
                    {
                        cmd.Connection = conn;
                        if (paramenters != null)
                            cmd.Parameters.AddRange(paramenters);
                        using (SqlDataAdapter SqDA = new SqlDataAdapter(cmd))
                        {
                            SqDA.Fill(dt);
                        }
                        return dt;
                    }
                }
                catch (Exception ex)
                {
                    Helper.WriteLog("ERROR [ExecuteParaQuery] : " + ex.Message);
                    return null;
                }
            }
        }
    }
}
