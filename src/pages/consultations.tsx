import './consultations.scss';
import { useEffect, useState } from 'react';
import { Table } from '../components/Table';
import { IConsultation } from '../types/consultations';
import { ConsultationDetailsPage } from './consultation-details';
import { getISOShort } from '../utils/datetime';

const CONSULTATIONS_ENDPOINT =
  'https://2revjapjwd.execute-api.us-west-1.amazonaws.com/dev/consultations';

const headerKeys: (keyof IConsultation)[] = [
  'id',
  'state',
  'patient_id',
  'doctor_id',
  'completedDate',
];

export const ConsultationsPage = () => {
  const [
    selectedConsultation,
    setSelectedConsultation,
  ] = useState<IConsultation | null>(null);
  const [filterTerm, setFilterTerm] = useState('');
  const [consultations, setConsultations] = useState<IConsultation[]>([]);

  useEffect(() => {
    const initialTitle = document.title;
    document.title = 'Apostrophe - Consultations'; // For fun

    const initState = async () => {
      const consultationsRes = await (
        await fetch(CONSULTATIONS_ENDPOINT)
      ).json();

      setConsultations(consultationsRes.response.elements);
    };

    initState();

    return () => {
      document.title = initialTitle;
    };
  }, []);

  const filteredConsultations = consultations.filter((consultation) => {
    const term = filterTerm.trim().toLowerCase();

    const {
      id,
      doctor_id,
      patient_id,
      state,
      conditionsTreated,
    } = consultation;

    return (
      [id, doctor_id, patient_id, state].some((value) =>
        value.includes(term)
      ) ||
      conditionsTreated.some(({ businessLine }) =>
        businessLine.toLowerCase().includes(term)
      )
    );
  });

  const renderTableView = () => {
    const headers = headerKeys.map((header) => <th key={header}>{header}</th>);
    const rows = filteredConsultations.map((consultation) => {
      const { id, state, patient_id, doctor_id, completedDate } = consultation;

      return (
        <tr key={id}>
          <td>
            <button onClick={() => setSelectedConsultation(consultation)}>
              {id}
            </button>
          </td>
          <td>{state}</td>
          <td>{patient_id}</td>
          <td>{doctor_id}</td>
          <td>{getISOShort(completedDate)}</td>
        </tr>
      );
    });

    return (
      <div className='table-view'>
        <h1>Consultations</h1>
        <input
          type='text'
          placeholder='id, doctor_id, patient_id, state, or conditionsTreated'
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value.trimLeft())}
        />
        {filterTerm && (
          <button onClick={() => setFilterTerm('')}>&times;</button>
        )}
        <Table headers={headers} rows={rows} rowsPerPage={10} />
      </div>
    );
  };

  const renderConsultationDetailsView = () => {
    return (
      <div className='consultation-details-view'>
        <button onClick={() => setSelectedConsultation(null)}>
          {'<'} Back
        </button>
        <ConsultationDetailsPage consultation={selectedConsultation!} />
      </div>
    );
  };

  return (
    <div className='consultations-page'>
      {selectedConsultation
        ? renderConsultationDetailsView()
        : renderTableView()}
    </div>
  );
};
