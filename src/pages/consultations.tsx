import './consultations.scss';
import { useEffect, useState } from 'react';
import { Table } from '../components/Table';
import { IConsultation } from '../types/consultations';
import { ConsultationDetailsPage } from './consultation-details';

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
    const initState = async () => {
      const consultationsRes = await (
        await fetch(CONSULTATIONS_ENDPOINT)
      ).json();
      console.log(consultationsRes);

      setConsultations(consultationsRes.response.elements);
    };

    initState();
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
    const rows = filteredConsultations.map((con) => (
      <tr key={con.id}>
        {headerKeys.map((header) => (
          <td key={header}>
            {header === 'id' ? (
              <button onClick={() => setSelectedConsultation(con)}>
                {con[header]}
              </button>
            ) : (
              con[header]
            )}
          </td>
        ))}
      </tr>
    ));

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
        <Table headers={headers} rows={rows} />
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
