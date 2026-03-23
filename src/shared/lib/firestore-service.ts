import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  getDoc,
  query
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, db, storage } from './firebase';

/**
 * Log Helper
 */
const logSync = (action: string, status: 'success' | 'error', details?: any) => {
  const emoji = status === 'success' ? '✅' : '❌';
  console.log(`${emoji} [Firestore ${action}]:`, details || '');
};

/**
 * Generic fetcher for a collection
 */
export const getCollectionContent = async (collectionName: string) => {
  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    logSync(`Fetch ${collectionName}`, 'success', `${data.length} items`);
    return data;
  } catch (error) {
    logSync(`Fetch ${collectionName}`, 'error', error);
    return [];
  }
};

/**
 * Update a specific document in a collection
 */
export const updateDocument = async (collectionName: string, id: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    logSync(`Update ${collectionName}/${id}`, 'success');
    return true;
  } catch (error) {
    logSync(`Update ${collectionName}/${id}`, 'error', error);
    throw error;
  }
};

/**
 * Add a new document to a collection
 */
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    logSync(`Add ${collectionName}`, 'success', docRef.id);
    return docRef.id;
  } catch (error) {
    logSync(`Add ${collectionName}`, 'error', error);
    throw error;
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    logSync(`Delete ${collectionName}/${id}`, 'success');
    return true;
  } catch (error) {
    logSync(`Delete ${collectionName}/${id}`, 'error', error);
    throw error;
  }
};

/**
 * Image Compression Helper
 */
const compressImage = async (file: File): Promise<Blob | File> => {
  if (!file.type.startsWith('image/')) return file;
  
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1000; // Even smaller for instant speed
      const MAX_HEIGHT = 1000;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          // Keep name but change to jpeg for smallest size
          const newName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
          resolve(new File([blob], newName, { type: 'image/jpeg' }));
        } else {
          resolve(file);
        }
      }, 'image/jpeg', 0.7); // 0.7 quality is fine for thumb/icons
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });
};

/**
 * Upload File to Firebase Storage with Compression
 */
export const uploadFile = async (file: File, folder: string = "gallery") => {
  try {
    const optimizedFile = await compressImage(file);
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    // Using standard uploadBytes for simplicity but with optimized file
    const snapshot = await uploadBytes(storageRef, optimizedFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    logSync(`Upload File (Optimized)`, 'success', downloadURL);
    return downloadURL;
  } catch (error) {
    logSync(`Upload File`, 'error', error);
    throw error;
  }
};

/**
 * Site Metadata Helpers (About, Contact info)
 */
export const getSiteMetadata = async (docId: string) => {
  try {
    const docRef = doc(db, 'metadata', docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      logSync(`Metadata Ready: ${docId}`, 'success');
      return docSnap.data();
    }
    logSync(`Metadata Not Found: ${docId}`, 'error');
    return null;
  } catch (error) {
    logSync(`Metadata ${docId}`, 'error', error);
    return null;
  }
};

export const updateSiteMetadata = async (docId: string, data: any) => {
  try {
    const docRef = doc(db, 'metadata', docId);
    await setDoc(docRef, data, { merge: true });
    logSync(`Metadata Sync: ${docId}`, 'success');
    return true;
  } catch (error) {
    logSync(`Metadata Sync: ${docId}`, 'error', error);
    throw error;
  }
};

/**
 * EXHAUSTIVE SEEDER — Restores all legacy static data into Cloud Firestore
 */
export const seedInitialData = async () => {
    try {
        console.log("🚀 Starting Global Data Synchronization...");

        // 1. SERVICES SEED (Sync with current user-side static code)
        const servicesCheck = await getDocs(collection(db, 'services'));
        if (servicesCheck.empty) {
            console.log("⚡ Seeding Legacy Services Portfolio...");
            const legacyServices = [
              {
                title: "Glass Partitions",
                subtitle: "Office & Commercial",
                desc: "Full and partial glass partition walls for offices, cabins and conference rooms. Custom sizes, frameless or framed.",
                image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&q=85",
                tags: ["Frameless", "Framed", "Office Cabins"]
              },
              {
                title: "Aluminium & UPVC Windows",
                subtitle: "Windows & Partitions",
                desc: "Durable, weather-resistant window frames and partition systems for all building types — residential to industrial.",
                image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=700&q=85",
                tags: ["Aluminium", "UPVC", "Casement", "Sliding"]
              },
              {
                title: "Structural Facade",
                subtitle: "Exterior Facade Systems",
                desc: "High-performance structural and semi-structural exterior glass facade systems for commercial buildings and IT parks.",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=85",
                tags: ["Structural", "Semi-Structural", "Curtain Wall"]
              },
              {
                title: "Glass Glazing",
                subtitle: "Composite Panel Work",
                desc: "Toughened glass glazing and composite ACP panel installations for building exteriors and interiors.",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=85",
                tags: ["Toughened Glass", "ACP Panels", "Safety Glass"]
              },
              {
                title: "Glass Interior Solutions",
                subtitle: "Complete Interior Fitouts",
                desc: "Custom glass shelving, cabinets, display units and full glass interior fitouts tailored to your design.",
                image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&q=85",
                tags: ["Shelving", "Cabinets", "Display Units"]
              },
              {
                title: "Decorative & LED Mirrors",
                subtitle: "Mirror Work",
                desc: "Backlit LED mirrors, decorative mirrors, vastu mirrors and custom mirror installations for all spaces.",
                image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&q=85",
                tags: ["LED Backlit", "Decorative", "Vastu"]
              },
              {
                title: "Acid, Stain & Bend Glass",
                subtitle: "Artistic Glass Treatments",
                desc: "Acid etching, stained glass, airbrush work and curved glass fabrication for unique architectural features.",
                image: "https://images.unsplash.com/photo-1516081498305-64feeb0b5ac0?w=700&q=85",
                tags: ["Acid Etching", "Stained Glass", "Bend Glass"]
              },
              {
                title: "PVC Fiber & Profile Doors",
                subtitle: "Door Systems",
                desc: "Moisture-resistant PVC fiber doors and premium profile door systems for all environments.",
                image: "https://images.unsplash.com/photo-1534138138883-7c157f12c3b8?w=700&q=85",
                tags: ["PVC Fiber", "Profile Doors", "Moisture Resistant"]
              }
            ];
            for (const svc of legacyServices) {
                await addDoc(collection(db, 'services'), svc);
            }
        }

        // 2. GALLERY SEED (If empty)
        const galleryCheck = await getDocs(collection(db, 'gallery'));
        if (galleryCheck.empty) {
            console.log("⚡ Seeding Legacy Gallery Portfolio...");
            const legacyGallery = [
                { title: "Corporate Facade", category: "Commercial", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" },
                { title: "Luxury UPVC Windows", category: "Residential", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" },
                { title: "Industrial Vision", category: "Industrial", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800" },
                { title: "Office Partition", category: "Partitions", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800" }
            ];
            for (const img of legacyGallery) {
                await addDoc(collection(db, 'gallery'), img);
            }
        }

        // 3. ABOUT SEED (Only if missing)
        const aboutCheck = await getDoc(doc(db, 'metadata', 'about'));
        if (!aboutCheck.exists()) {
            console.log("⚡ Seeding Legacy About Narrative...");
            await setDoc(doc(db, 'metadata', 'about'), {
                yearsExperience: "15+",
                leaderName: "Pratap Bhagwanrao Kathare",
                introTitle: "Vision Glass Creation",
                introText1: "Vision Glass Creation is Pune's trusted expert in premium window and glass solutions. With years of hands-on experience across commercial, residential and industrial projects, we deliver end-to-end glass work — from elegant office partitions and structural facades to decorative mirrors and custom interiors.",
                introText2: "Our commitment to quality workmanship and professional finishing has earned the trust of leading architects, builders, hospitals, schools and industrial companies across the region.",
                whyChoose: [
                    { title: "One-Stop Solution", desc: "Complete window and glass work under one roof — no need to juggle contractors." },
                    { title: "Quality Workmanship", desc: "Professional finishing and attention to detail on every single project." },
                    { title: "Trusted by Leaders", desc: "Architects, hospitals, schools and builders rely on us consistently." },
                    { title: "End-to-End Service", desc: "From initial consultation and design right through to final installation." }
                ],
                clientTabs: [
                    {
                        label: "Architects",
                        clients: ["Arct Uday Kulkarni", "Arct Ashish Shinde", "Arct Omkar Mansuk", "Arct Rajendra Kore", "Arct Pore Madam", "Arct Vishal Ranka", "Arct Utakarsha Madam", "Arct Lalit Surve", "Arct Jambhalkar"]
                    },
                    {
                        label: "Interior Designers",
                        clients: ["Rahul Chordiya", "Kashmira Madam", "Purva Joshi", "Vijay Patel", "Mangesh Pisal", "Hemant Sutar"]
                    },
                    {
                        label: "Builders",
                        clients: ["Garve Developers", "VT Adaskar"]
                    },
                    {
                        label: "Hospitals",
                        clients: ["Icon Hospital", "Sparsh Hospital", "Star Hospital", "Dr. Amit Wagh", "Dr. Marne", "Dr. Shrikant Rao"]
                    },
                    {
                        label: "Schools",
                        clients: ["Cambridge International School", "New Pune Public School", "Orchid School", "Puna Public School"]
                    },
                    {
                        label: "Industrial",
                        clients: ["SGS Chakan Mumbai", "Bajaj Auto", "Manmohan Decor", "Manmohan Interior", "ABN Associates", "Vinus Group"]
                    }
                ],
                workWith: [
                    { title: "Architects" },
                    { title: "Interior Decorators" },
                    { title: "Carpenters" },
                    { title: "HR & Purchase Depts." },
                    { title: "Builders & Developers" }
                ],
                industries: [
                    { title: "Architects" },
                    { title: "Facility Management" },
                    { title: "MEP Contractors" },
                    { title: "Industrial Decorators" },
                    { title: "Real Estate Developers" },
                    { title: "HR & Purchase Dept." }
                ]
            });
        }

        // 4. HOME SEED (Robust Upsert)
        const homeRef = doc(db, 'metadata', 'home');
        const homeCheck = await getDoc(homeRef);
        if (!homeCheck.exists() || !homeCheck.data()?.servicesTitle) {
            console.log("⚡ Upgrading/Seeding Home Architecture...");
            await setDoc(homeRef, {
                // Header Content
                heroTitle1: "Expert in Window",
                heroTitle2: "& Glass Solutions",
                heroSubtitle: "Premium glass partitions, facades, mirrors and window solutions for commercial, residential and industrial spaces across Pune.",
                heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=90",
                
                // Services Section Highlights
                servicesTitle: "Our Services",
                servicesSubtitle: "End-to-end glass solutions, crafted with precision and delivered with care across Pune's skyline.",
                services: [
                    { title: "Glass Partitions", desc: "Frameless and framed partition walls for modern offices and commercial cabins.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85", icon: "PanelTop" },
                    { title: "Aluminium & UPVC Windows", desc: "Weather-sealed, thermally efficient window systems for every building type.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=85", icon: "Frame" },
                    { title: "Structural Facade", desc: "High-performance curtain wall and structural glazing for commercial towers.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85", icon: "Building2" },
                    { title: "Glass Glazing", desc: "Toughened safety glass and composite ACP panel installations inside and out.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85", icon: "Layers" },
                    { title: "Interior Glass Solutions", desc: "Custom glass shelving, display units, and complete interior glass fitouts.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85", icon: "Lamp" },
                    { title: "Decorative & LED Mirrors", desc: "Backlit LED mirrors, vastu mirrors, and bespoke decorative installations.", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=85", icon: "Paintbrush" },
                ],

                // Trust Carousel
                trustTitle: "Trusted by Industry Leaders",
                trustSubtitle: "From architects to industrialists — they all rely on Vision Glass.",
                trustedBy: [
                    { label: "Architects", desc: "Leading firms across Pune", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80" },
                    { label: "Builders", desc: "Residential & commercial developers", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
                    { label: "Hospitals", desc: "Healthcare facilities & clinics", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
                    { label: "Schools", desc: "Educational institutions", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80" },
                    { label: "Industrial", desc: "Factories & manufacturing units", image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80" },
                ],

                // USP Points
                uspBackgroundImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85",
                uspTitle: "Complete glass solutions under one roof — quality guaranteed.",
                uspSubtitle: "Professional finishing on every project, large or small.",
                uspPoints: [
                    "One-stop glass solution provider",
                    "Professional installation team",
                    "Trusted by 50+ architects & builders",
                    "Quality workmanship guaranteed",
                ],

                // Referral Cards
                referTitle: "Know Someone Who Needs Us?",
                referSubtitle: "Help them connect with the right glass solution.",
                referCards: [
                    { question: "Looking for office cabin or glass partition work?", sub: "We design and install custom office partitions across Pune.", icon: "PanelTop" },
                    { question: "Need to replace broken cabin or window glass?", sub: "Fast, reliable glass replacement with professional finishing.", icon: "Frame" },
                    { question: "Searching for soundproof glass or window solutions?", sub: "Acoustic glass systems engineered for peace and privacy.", icon: "Shield" },
                ]
            });
        }

        // 5. CONTACT SEED (Only if missing)
        const contactCheck = await getDoc(doc(db, 'metadata', 'contact'));
        if (!contactCheck.exists()) {
            console.log("⚡ Seeding Legacy Contact Metadata...");
            await setDoc(doc(db, 'metadata', 'contact'), {
                phone: "+91 99219 17083",
                officePhone: "+91 78409 17083",
                email: "visionglasscreation1@gmail.com",
                address: "Plot No. 595, Ganganagar, Nigdi, Pimpri-Chinchwad 411044",
                socials: { whatsapp: "919921917083", instagram: "@vision_glass" },
                mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2!2d73.77!3d18.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM5JzAwLjAiTiA3M8KwNDYnMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            });
        }

        console.log("✅ Global System Hydrated.");
    } catch (err: any) {
        logSync("Global Seed", 'error', err);
    }
};
