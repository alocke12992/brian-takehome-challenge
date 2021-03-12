import './consultation-details.scss';
import { IConsultation } from '../types/consultations';
import { getISOShort } from '../utils/datetime';

export const ConsultationDetailsPage = (props: {
  consultation: IConsultation;
}) => {
  const { consultation } = props;
  const { prescriptions, conditionsTreated } = consultation;

  return (
    <div className='consultation-details-page'>
      <h1>Consultation Details</h1>
      <div className='consultation-details-table'>
        <div className='label'>id</div>
        <div className='value'>{consultation.id}</div>
        <div className='label'>state</div>
        <div className='value'>{consultation.state}</div>
        <div className='label'>patient_id</div>
        <div className='value'>{consultation.patient_id}</div>
        <div className='label'>doctor_id</div>
        <div className='value'>{consultation.doctor_id}</div>
        <div className='label'>completedDate</div>
        <div className='value'>{getISOShort(consultation.completedDate)}</div>
        <div className='label'>followupDate</div>
        <div className='value'>{getISOShort(consultation.followupDate)}</div>
        <div className='label'>submittedDate</div>
        <div className='value'>{getISOShort(consultation.submittedDate)}</div>
        <div className='label'>isFollowup</div>
        <div className='value'>{String(Boolean(consultation.isFollowup))}</div>
        <div className='label'>numFollowup</div>
        <div className='value'>
          {consultation.isFollowup ? consultation.numFollowup : 'n/a'}
        </div>
      </div>

      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map((prescription) => {
          const { drug, rxdate, routedetails, ...rest } = prescription;

          return (
            <li className='prescription-item' key={prescription.patientrxid}>
              <details>
                <summary>{drug}</summary>
                <ul>
                  <li>rxdate: {getISOShort(rxdate)}</li>
                  {routedetails && (
                    <li dangerouslySetInnerHTML={{ __html: routedetails }} />
                  )}
                  {Object.entries(rest).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>

      <h2>Conditions Treated</h2>
      <ul>
        {conditionsTreated.map((condition) => {
          const { businessLine, required, requested } = condition;

          return (
            <li className='prescription-item' key={businessLine}>
              {businessLine} - {requested ? 'requested' : 'not requested'},{' '}
              {required ? 'required' : 'not required'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
