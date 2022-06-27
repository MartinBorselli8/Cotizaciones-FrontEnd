﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Cotizaciones_FrontEnd.Models;

namespace Cotizaciones_FrontEnd.Data
{
    public class DA_Logic
    {
        public User ValidateUser(string _userName, string _password)
        {
            List<User> users = getUsers();
            return users.Where(item => item.UserName == _userName && item.Password == _password).FirstOrDefault();
            //return users.Where(item => item.UserName == _userName && item.Password == _password && item.FechaElimina != null).FirstOrDefault();

        }

        public List<User> getUsers()
        {
            List<User> usuarios = new List<User>();

            using (SqlConnection conexion = new SqlConnection("workstation id=CotizacionesDB.mssql.somee.com;packet size=4096;user id=MartinBorselli8_SQLLogin_1;pwd=tu9hec91r2;data source=CotizacionesDB.mssql.somee.com;persist security info=False;initial catalog=CotizacionesDB"))
            {

                string query = "select UserName, [Password], FechaElimina from dbo.[User]";

                SqlCommand cmd = new SqlCommand(query, conexion);

                conexion.Open();

                using (SqlDataReader dr = cmd.ExecuteReader())
                {

                    while (dr.Read())
                    {
                        User usuario = new User()
                        {
                            UserName = dr["UserName"].ToString(),
                            Password = dr["Password"].ToString()

                        };
                        usuarios.Add(usuario);
                    }

                }
            }
            return usuarios;
        }
    }
}
