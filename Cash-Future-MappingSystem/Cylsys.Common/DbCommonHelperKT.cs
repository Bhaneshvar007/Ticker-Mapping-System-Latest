using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using MySql.Data.MySqlClient;

namespace Cylsys.Common
{
    public class DbCommonHelperKT
    {
        string strcon = ConfigurationManager.ConnectionStrings["DatabaseConnection"].ToString();

        List<RecordException> ERROR_LIST = new List<RecordException>();
        SqlTransaction trans;


    }
}
