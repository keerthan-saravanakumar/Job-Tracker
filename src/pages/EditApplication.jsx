import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplications } from '../context/ApplicationContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useMemo } from 'react';
import './Form.css';

const schema = yup.object().shape({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Role is required'),
  location: yup.string(),
  salary: yup.string(),
  platform: yup.string(),
  status: yup.string().required('Status is required'),
  appliedDate: yup.date().required('Applied date is required').typeError('Invalid date'),
  interviewDate: yup.date().nullable().transform((curr, orig) => orig === '' ? null : curr).typeError('Invalid date'),
  notes: yup.string()
});

export default function EditApplication() {
  const { applications, updateApplication } = useApplications();
  const { id } = useParams();
  const navigate = useNavigate();
  const job = useMemo(() => applications.find(app => app.id === id), [applications, id]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (job) {
      const defaultValues = {
        ...job,
        appliedDate: job.appliedDate ? new Date(job.appliedDate).toISOString().split('T')[0] : '',
        interviewDate: job.interviewDate ? new Date(job.interviewDate).toISOString().split('T')[0] : ''
      };
      reset(defaultValues);
    } else {
      toast.error('Application not found');
      navigate('/applications');
    }
  }, [job, reset, navigate]);

  const onSubmit = (data) => {
    if(data.interviewDate) {
      data.interviewDate = new Date(data.interviewDate).toISOString();
    }
    if(data.appliedDate) {
      data.appliedDate = new Date(data.appliedDate).toISOString();
    }
    
    updateApplication(id, data);
    toast.success('Application updated successfully!');
    navigate('/applications');
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Edit Job Application</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="app-form">
          <div className="form-group row">
            <div className="input-box">
              <label>Company Name *</label>
              <input type="text" {...register('company')} className={errors.company ? 'error-input' : ''} />
              {errors.company && <p className="error-msg">{errors.company.message}</p>}
            </div>
            <div className="input-box">
              <label>Job Role *</label>
              <input type="text" {...register('role')} className={errors.role ? 'error-input' : ''} />
              {errors.role && <p className="error-msg">{errors.role.message}</p>}
            </div>
          </div>

          <div className="form-group row">
            <div className="input-box">
              <label>Location</label>
              <input type="text" {...register('location')} placeholder="e.g. Remote, NY" />
            </div>
            <div className="input-box">
              <label>Salary Range</label>
              <input type="text" {...register('salary')} placeholder="e.g. $100k - $120k" />
            </div>
          </div>

          <div className="form-group row">
            <div className="input-box">
              <label>Platform</label>
              <input type="text" {...register('platform')} placeholder="e.g. LinkedIn, Indeed" />
            </div>
            <div className="input-box">
              <label>Status *</label>
              <select {...register('status')} className={errors.status ? 'error-input' : ''}>
                <option value="Applied">Applied</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offer Received">Offer Received</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <div className="input-box">
              <label>Applied Date *</label>
              <input type="date" {...register('appliedDate')} className={errors.appliedDate ? 'error-input' : ''} />
              {errors.appliedDate && <p className="error-msg">{errors.appliedDate.message}</p>}
            </div>
            <div className="input-box">
              <label>Interview Date</label>
              <input type="date" {...register('interviewDate')} />
              {errors.interviewDate && <p className="error-msg">{errors.interviewDate.message}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea {...register('notes')} rows="4" placeholder="Any follow-up details..."></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-primary">Update Application</button>
          </div>
        </form>
      </div>
    </div>
  );
}
