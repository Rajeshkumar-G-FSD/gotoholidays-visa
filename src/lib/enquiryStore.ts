import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from './firebase';
import { EnquiryRecord } from '../types';

const LS_KEY = 'gh_enquiries';
const COLLECTION = 'enquiries';

type RawData = Record<string, string | string[]>;

const s = (d: RawData, k: string) => (typeof d[k] === 'string' ? (d[k] as string) : '');

/** Build a normalised record from the raw form payload. */
export const buildRecord = (type: 'visa' | 'travel', data: RawData): EnquiryRecord => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type,
  createdAt: new Date().toISOString(),
  name: s(data, 'fullName'),
  email: s(data, 'email'),
  phone: s(data, 'phone'),
  residence: s(data, 'residence'),
  contactMethod: s(data, 'contactMethod'),
  subject: type === 'visa' ? s(data, 'visaCountry') : s(data, 'destination'),
  travelDate: type === 'visa' ? s(data, 'visaTravelDate') : s(data, 'startDate'),
  travellers: type === 'visa' ? s(data, 'visaApplicants') : s(data, 'adults'),
  raw: data,
});

const readLS = (): EnquiryRecord[] => {
  try {
    const v = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

const writeLS = (list: EnquiryRecord[]) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
};

/** Persist an enquiry: always to localStorage, and best-effort to Firestore. */
export const saveEnquiry = async (record: EnquiryRecord) => {
  writeLS([record, ...readLS()].slice(0, 500));
  try {
    await addDoc(collection(db, COLLECTION), record as unknown as Record<string, unknown>);
  } catch {
    /* Firestore rules / offline — localStorage copy still kept */
  }
};

/**
 * Subscribe to the enquiry list. Merges the local cache with the Firestore
 * collection when it is reachable. Returns an unsubscribe function.
 */
export const subscribeEnquiries = (cb: (list: EnquiryRecord[]) => void) => {
  cb(readLS());

  let firestore: EnquiryRecord[] = [];
  const emit = () => {
    const byId = new Map<string, EnquiryRecord>();
    [...readLS(), ...firestore].forEach((r) => byId.set(r.id, r));
    cb([...byId.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  };

  let unsub = () => {};
  try {
    unsub = onSnapshot(
      query(collection(db, COLLECTION), orderBy('createdAt', 'desc')),
      (snap) => {
        firestore = snap.docs.map((d) => d.data() as EnquiryRecord);
        emit();
      },
      () => {
        /* permission denied / offline — keep localStorage view */
      }
    );
  } catch {
    /* ignore */
  }

  const onStorage = (e: StorageEvent) => {
    if (e.key === LS_KEY) emit();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    unsub();
    window.removeEventListener('storage', onStorage);
  };
};
