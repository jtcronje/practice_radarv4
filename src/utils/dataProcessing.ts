import Papa from 'papaparse';

export interface BillingRecord {
  'Invoice / Claim ID': string;
  'Procedure Record ID': string;
  'Date Billed / Claim Submit Date': string;
  'Billed Amount': number;
  'Medical Aid Tariff': number;
  'MBT Percentage': number;
  'Amount Paid - Medical Aid': number;
  'Date Paid - Medical Aid': string;
  'Patient Portion': number;
  'Amount Paid - Patient': number;
  'Date Paid - Patient': string;
  'Outstanding Amount': number;
  'Rejection Code / Reason': string;
  'Write-off Amount': number;
  'Write-off Reason': string;
  'Payment Method': string;
}

export interface ProcedureRecord {
  'Procedure Record ID': string;
  'Provider ID': string;
  'Patient ID': string;
  'Location ID': string;
  'Date of Service': string;
  'Procedure Code': string;
  'Procedure Description': string;
  'Diagnosis Code': string;
  'Diagnosis Description': string;
  'Duration (Minutes)': number;
  'Time Units': number;
  'Modifiers': string;
  'ASA Physical Status Class': string;
  'Referring Doctor Name/Number': string;
}

export interface DoctorRecord {
  'Provider ID': string;
  'Provider Name': string;
  'Provider Practice Number': number;
  'Specialty': string;
}

export interface HospitalRecord {
  'Location ID': string;
  'Location Name': string;
}

export interface PatientRecord {
  'Patient ID': string;
  'Patient First Name': string;
  'Patient Last Name': string;
  'Patient Date of Birth': string;
  'Patient Gender': string;
  'Medical Aid Name': string;
  'Medical Aid Scheme/Plan': string;
  'Medical Aid Number': number;
  'Dependant Code': number;
}

export async function loadCSVData<T>(filename: string): Promise<T[]> {
  try {
    const response = await fetch(`/data/${filename}`);
    const text = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as T[]);
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    throw error;
  }
}

export function filterByDateRange<T>(
  data: T[],
  dateField: keyof T,
  dateRange: string
): T[] {
  const today = new Date();
  const cutoffDate = new Date();
  cutoffDate.setDate(today.getDate() - parseInt(dateRange));

  return data.filter((item) => {
    const dateValue = item[dateField];
    if (!dateValue) return false;
    const itemDate = new Date(dateValue as string);
    return itemDate >= cutoffDate && itemDate <= today;
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return 'N/A';
  
  try {
    const dateObj = new Date(date);
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', date, error);
    return 'Invalid date';
  }
}

export function calculateTrend(current: number, previous: number): {
  value: string;
  direction: 'up' | 'down' | 'neutral';
} {
  if (current === previous) {
    return { value: '0%', direction: 'neutral' };
  }

  const percentageChange = ((current - previous) / previous) * 100;
  const direction = percentageChange > 0 ? 'up' : 'down';
  
  return {
    value: `${Math.abs(percentageChange).toFixed(1)}%`,
    direction,
  };
}