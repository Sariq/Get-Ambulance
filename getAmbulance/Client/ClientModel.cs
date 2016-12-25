﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace getAmbulance.Client
{
    public class ClientModel
    {
        public class ClientEntity : DatabaseObject
        {
            public string Full_Name { get; set; }
            public string Phone_Number { get; set; }
            public string Id_Number { get; set; }
           // public string Age { get; set; }

        }
        public class ClientUserProfileEntity : ClientEntity
        {
            public string User_Name { get; set; }
           // public string Email { get; set; }
        }


        public class CodeToClientModel
        {
            [Required]
            [Display(Name = "Phone_Number")]
            public string Phone_Number { get; set; }
        }
            public class ClientRegisterModel
        {
            //[Required]
            //[Display(Name = "Email")]
            //public string Email { get; set; }
            [Required]
            [Display(Name = "Full_Name")]
            public string Full_Name { get; set; }
            [Required]
            [Display(Name = "Phone_Number")]
            public string Phone_Number { get; set; }
            [Required]
            [Display(Name = "Id_Number")]
            public string Id_Number { get; set; }
            //[Required]
            //[Display(Name = "Age")]
            //public string Age { get; set; }



            //[Required]
            //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
            //[DataType(DataType.Password)]
            //[Display(Name = "Password")]
            //public string Password { get; set; }

            //[DataType(DataType.Password)]
            //[Display(Name = "Confirm password")]
            //[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
            //public string ConfirmPassword { get; set; }
        }
    }
}