import React, { FC, useState } from 'react';
import CarDeleteModal from './CarDeleteModal';
import { format } from 'date-fns';
import { CarProps } from './carTypes';
import CarEditModal from './CarEditModal';
import { Clock, Edit, Key, Trash } from 'react-feather';
import { deleteCar, updateCar } from '../../../../services/car/car.services';

interface CarCardProps {
  car: CarProps;
  setRefresh: (refresh: boolean) => void;
  setNotificationMessage: (message: string) => void;
  setNotificationColor: (color: string) => void;
}

const CarCard: FC<CarCardProps> = ({
  car,
  setRefresh,
  setNotificationMessage,
  setNotificationColor
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function formatDate(date: Date | string) {
    return format(date, 'd MMM yyyy, HH:mm');
  }

  const handleUpdate = (carId: number, updatedCar: FormData) => {
    updateCar(carId, updatedCar)
      .then(({ success, message }) => {
        if (success) {
          console.log('Car updated');
          setNotificationMessage(message);
          setNotificationColor('green');
          setShowEditModal(false);
          setRefresh(true);
          return;
        } else {
          console.log('Update car failed');
          setNotificationMessage(message);
          setNotificationColor('red');
        }
      })
      .catch((err) => console.error('Error:', err));
  };

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteCar(car.id)
      .then(() => {
        console.log('car deleted');
        setNotificationMessage('Data Berhasil Dihapus');
        setNotificationColor('black');
        setShowDeleteModal(false);
        setRefresh(true);
      })
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div>
      <div className="car-filter-card card mx-3 my-3">
        <img
          src={car.image ? car.imageUrl : '/assets/images/noImage.jpg'}
          alt="Car"
          className="car-filter-img img-fluid"
        />
        <div className="card-body">
          <p className="card-text fw-bold">
            {car.model}/{car.type ? car.type : 'Tipe Mobil'}
          </p>
          <p className="fw-bold fs-5">
            Rp {Number(car.price).toLocaleString('id-ID', { currency: 'IDR' })} /hari
          </p>
          <div className="d-flex align-items-center my-2">
            <Key className="car-icon" />
            <p className="my-0 mx-2">Start Rent - Finish Rent</p>
          </div>
          <div className="d-flex align-items-center my-2">
            <Clock className="car-icon" />
            <p className="my-0 mx-2">
              {car.updatedAt
                ? `Updated At ${formatDate(car.updatedAt)}`
                : car.createdAt
                ? `Created At ${formatDate(car.createdAt)}`
                : 'Updated At 4 Apr 2022, 09:00'}
            </p>
          </div>
          <div className="container">
            <div className="row g-2">
              <div className="col-6">
                <button
                  type="button"
                  className="deleteCarButton btn d-block w-100"
                  onClick={() => setShowDeleteModal(true)}>
                  <Trash className="car-edit-icon" /> Delete
                </button>
              </div>
              <div className="col-6">
                <button
                  className="editCarButton btn d-block w-100"
                  type="button"
                  onClick={() => setShowEditModal(true)}>
                  <Edit className="car-edit-icon" /> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <CarEditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          updateCar={car}
          onSave={handleUpdate}
        />
      )}

      {showDeleteModal && (
        <CarDeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CarCard;
