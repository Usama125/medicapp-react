import React from 'react'
import { href } from '../../../../constants/extra'
import mapImage from '../../../../assets/images/map.png';
import PATIENT_IMAGE from '../../../../assets/images/patient.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import HospitalApi from '../../../../api/Hospital';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../../../constants/Redirects';

function HospitalAccount({ hospitalId, hospital }) {

   const history = useHistory();

   const formik = useFormik({
      initialValues: {
        name: hospital?.name,
        tradeLicenseNo: hospital?.tradeLicenseNo,
        location: hospital?.location,
        phoneNo: hospital?.phoneNo,
        email: hospital?.email,
        tradeLicenseFile: "",
        password: ""
      },
      validationSchema: Yup.object({}),
      onSubmit: async values => {
         //  let formData = new FormData();
         //  formData.append("name", values.name);
         //  formData.append("tradeLicenseNo", values.tradeLicenseNo);
         //  formData.append("location", values.location);
         //  formData.append("phoneNo", values.phoneNo);
         //  formData.append("email", values.email);
         //  formData.append("password", values.password);
         // TODO: Update tradeLicenseFile
         //  formData.append('tradeLicenseFile', file);
         const response = await HospitalApi.updateHospitalProfile(hospitalId, values);
         if(!response.error){
            toast.success("Hospital profile updated");
            localStorage.clear();
            setTimeout(() => {
               window.location.reload();
            }, 2000);
         }else {
            toast.error("Problem while updating the hospital");
         }
      },
      enableReinitialize: true
    });
   
    return (
        <>
            <div className="row patient-profile">
               <div className="col-md-3 col-lg-3 col-xl-2">
                  <div className="profile-image">
                     <img src={PATIENT_IMAGE} alt="patient" />
                     <a href={href}><span className="fa fa-pencil"></span></a>
                  </div>
               </div>
               <div className="col-md-9 col-lg-9 col-xl-8">
                  <h4 className="mb-3">Hospital Details</h4>
                  <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                     <div className="row">
                        <div className="col-sm-6">
                           <div className="form-group">
                                 <input type="text" {...formik.getFieldProps('name')} class={ (formik.touched.name && formik.errors.name) ? "form-control is-invalid" : "form-control"} placeholder="Hospital Name" />
                                 {formik.touched.name && formik.errors.name ? (
                                    <div class="invalid-feedback text-right-aligned">{formik.errors.name}</div>
                                 ) : null}   
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <input type="text" {...formik.getFieldProps('tradeLicenseNo')} class={ (formik.touched.tradeLicenseNo && formik.errors.tradeLicenseNo) ? "form-control is-invalid" : "form-control"} placeholder="Trade License Number" />
                                {formik.touched.tradeLicenseNo && formik.errors.tradeLicenseNo ? (
                                    <div class="invalid-feedback text-right-aligned">{formik.errors.tradeLicenseNo}</div>
                              ) : null}
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-sm-6">
                           <div className="form-group">
                              <input type="text" {...formik.getFieldProps('location')} class={ (formik.touched.location && formik.errors.location) ? "form-control is-invalid" : "form-control"} placeholder="Address" /> 
                                {formik.touched.location && formik.errors.location ? (
                                    <div class="invalid-feedback text-right-aligned">{formik.errors.location}</div>
                              ) : null}
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group position-relative">
                              <input type="file" className="form-control custom-file-input" id="validatedCustomFile" />
                              <label className="custom-file-label form-control" htmlFor="validatedCustomFile">Upload Trade License</label>
                           </div>
                        </div>
                     </div>
                     {/* TODO: Map Set Location */}
                     {/* <div className="row">
                        <div className="col-sm-12">         
                           <div className="map-bg" style={{ backgroundImage: `url(${mapImage})` }}>
                              <button type="button" className="btn btn-primary px-4">UPDATE MAP LOCATION</button>
                           </div>
                        </div>
                     </div> */}
                     <h4 className="mb-4 mt-4">Contact Details</h4>
                     <div className="row">
                        <div className="col-sm-6">
                           <div className="form-group">
                              <input type="email" {...formik.getFieldProps('email')} class={ (formik.touched.email && formik.errors.email) ? "form-control is-invalid" : "form-control"} placeholder="Email" /> 
                                {formik.touched.email && formik.errors.email ? (
                                    <div class="invalid-feedback text-right-aligned">{formik.errors.email}</div>
                              ) : null}   
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <input type="text" {...formik.getFieldProps('phoneNo')} class={ (formik.touched.phoneNo && formik.errors.phoneNo) ? "form-control is-invalid" : "form-control"} placeholder="Phone" /> 
                                {formik.touched.phoneNo && formik.errors.phoneNo ? (
                                    <div class="invalid-feedback text-right-aligned">{formik.errors.phoneNo}</div>
                              ) : null}
                           </div>
                        </div>
                        <div className="col-sm-6">
                           <div className="form-group">
                              <input type="password" {...formik.getFieldProps('password')} class={ (formik.touched.password && formik.errors.password) ? "form-control is-invalid" : "form-control"} placeholder="Password" />
                                {formik.touched.password && formik.errors.password ? (
                                    <div class="invalid-feedback text-right-aligned">{formik.errors.password}</div>
                              ) : null}
                           </div>
                        </div>
                     </div>
                     <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary mt-2">Update</button>
                     </div>
                  </form>
               </div>
            </div>
        </>
    )
}

export default HospitalAccount
