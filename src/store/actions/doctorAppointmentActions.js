import { toast } from "react-toastify";
import AppointmentApi from "../../api/Appointment"
import { DELETE_APPOINTMENT, GET_APPOINTMENTS, SET_PAGE_NUMBER } from "../types/doctorAppointments"

export const getDoctorAppointments = (doctorId, pageNo) => async (dispatch, getState) => {
    try {
        const response = await AppointmentApi.getDoctorAppointments(doctorId, pageNo);

        dispatch({
            type: GET_APPOINTMENTS,
            payload: response.data.data
        })
        return response;
    }catch(err) {
        toast.error("Problem while getting doctors");
    }
}

export const deleteDoctorAppointment = (id) => async (dispatch, getState) => {
    try {
        await AppointmentApi.deleteAppointment(id);

        dispatch({
            type: DELETE_APPOINTMENT,
            payload: id
        });
        toast.success("Doctor deleted successfully");
    }catch(err) {
        toast.error(err.response.data.message);
    }
}

export const setPageNumber = (pageNo) => ({
    type: SET_PAGE_NUMBER,
    payload: pageNo
})
