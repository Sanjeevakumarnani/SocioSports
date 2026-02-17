import React, { useRef, useEffect, useState } from 'react';
import {
  X, User, Mail, Phone, MapPin, Award, ChevronDown,
  CheckCircle, Loader2, ArrowRight, ArrowLeft, Camera,
  Briefcase, Globe, ShieldCheck, Trophy, Sparkles
} from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { toast } from 'react-hot-toast';

interface SportsPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIdentity?: Identity;
}

const sports = [
  'Cricket', 'Football', 'Badminton', 'Basketball', 'Athletics',
  'Tennis', 'Hockey', 'Kabaddi', 'Swimming', 'Boxing',
  'Wrestling', 'Table Tennis', 'Volleyball', 'Archery', 'Other'
];

type RegistrationStep = 'PHONE' | 'OTP' | 'IDENTITY' | 'DETAILS' | 'PROFILE' | 'WELCOME';
type Identity = 'GENERAL' | 'TRAINER' | 'ATHLETE' | null;

const SportsPersonModal: React.FC<SportsPersonModalProps> = ({ isOpen, onClose, defaultIdentity = null }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useFocusTrap(modalRef, isOpen, onClose);

  const [step, setStep] = useState<RegistrationStep>('PHONE');
  const [identity, setIdentity] = useState<Identity>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [sportsId, setSportsId] = useState('');

  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    fullName: '',
    email: '',
    profession: '',
    location: '',
    sport: '',
    experience: '',
  });

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Generate ID logic moved to identity selection for correct prefix
      if (defaultIdentity) {
        setIdentity(defaultIdentity);
      }
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setStep('PHONE'), 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Update ID when identity changes
  useEffect(() => {
    if (identity === 'ATHLETE') {
      const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digit number
      setSportsId(`AT${randomNum}`);
    } else if (identity === 'TRAINER') {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setSportsId(`CO${randomNum}`);
    } else if (defaultIdentity) {
      // Fallback if default is set but identity effect hasn't run yet or for initial state
      // This might need to be refined if defaultIdentity can be something else
      const prefix = defaultIdentity === 'ATHLETE' ? 'AT' : defaultIdentity === 'TRAINER' ? 'CO' : 'SS';
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setSportsId(`${prefix}${randomNum}`);
    }
  }, [identity, defaultIdentity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOTP = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    setIsLoading(true);
    try {
      await api.otp.sendPhone(formData.phone, 'athlete_identity');
      toast.success('Code sent! Please check your phone.');
      setStep('OTP');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (formData.otp.length < 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.otp.verify(formData.phone, formData.otp, 'athlete_identity', 'phone');
      if (res.success) {
        setStep('IDENTITY');
      } else {
        toast.error('Invalid or expired code');
      }
    } catch (error) {
      toast.error('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.uploadProfile(file);
      setProfileImage(res.url);
      toast.success('Photo uploaded!');
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async () => {
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in your name and email');
      return;
    }
    setIsLoading(true);
    try {
      // First, create the formal inquiry entry
      await api.createInquiry({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: `New ${identity} Registration`,
        message: `Identity: ${identity} | Sport: ${formData.sport} | Location: ${formData.location} | ID: ${sportsId}`
      });

      // Then, trigger the welcome/ID email
      await api.finishRegistration({
        email: formData.email,
        name: formData.fullName,
        sportsId,
        role: identity
      });

      // Save public profile for search
      try {
        await api.sportsProfiles.create({
          sportsId,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: identity,
          sport: identity === 'ATHLETE' ? formData.sport : undefined,
          profession: identity === 'TRAINER' ? formData.profession : undefined,
          location: formData.location,
          image: profileImage
        });
      } catch (err) {
        console.error('Failed to save public profile:', err);
        // Don't block success flow if this fails, they still got the email
      }

      setStep('WELCOME');
    } catch (error) {
      console.error(error);
      toast.error('Failed to complete registration');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      phone: '', otp: '', fullName: '', email: '',
      profession: '', location: '', sport: '', experience: ''
    });
    setStep('PHONE');
    setIdentity(null);
    setProfileImage(null);
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 'PHONE':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Registration</h2>
              <p className="text-[var(--text-secondary)]">Enter your mobile number to get started</p>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-white/10 pr-3">
                <span className="text-white font-bold">🇮🇳 +91</span>
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-24 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-lg focus:outline-none focus:border-[var(--accent-orange)] transition-all"
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={isLoading}
              className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'} <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        );

      case 'OTP':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button onClick={() => setStep('PHONE')} className="flex items-center gap-1 text-[var(--accent-orange)] text-sm font-medium mb-4">
              <ArrowLeft className="w-4 h-4" /> Change Number
            </button>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Verify OTP</h2>
              <p className="text-[var(--text-secondary)]">Enter the code sent to {formData.phone}</p>
              <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">(Logged to server console)</p>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  ref={el => otpInputs.current[i] = el}
                  type="text"
                  maxLength={1}
                  className="w-full aspect-square text-center text-xl font-bold rounded-xl bg-white/5 border border-white/10 text-white focus:border-[var(--accent-orange)] focus:ring-1 focus:ring-[var(--accent-orange)]"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && i < 5) otpInputs.current[i + 1]?.focus();
                    const newOtp = formData.otp.split('');
                    newOtp[i] = val;
                    setFormData(prev => ({ ...prev, otp: newOtp.join('') }));
                  }}
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={isLoading}
              className="w-full btn-primary py-4 text-lg font-bold disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Continue'}
            </button>
          </motion.div>
        );

      case 'IDENTITY':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Choose Your Identity</h2>
              <p className="text-[var(--text-secondary)]">How would you like to use SocioSports?</p>
            </div>
            <div className="grid gap-4">
              {[
                { id: 'GENERAL', label: 'General Citizen', icon: User, desc: 'Follow sports and join communities' },
                { id: 'ATHLETE', label: 'Sportsman / Athlete', icon: Trophy, desc: 'Compete, track performance and grow' },
                { id: 'TRAINER', label: 'Trainer / Coach', icon: Award, desc: 'Manage athletes and grow your brand' },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setIdentity(role.id as Identity)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${identity === role.id
                    ? 'bg-[var(--accent-orange)]/20 border-[var(--accent-orange)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${identity === role.id ? 'bg-[var(--accent-orange)] text-white' : 'bg-white/10 text-white/50'
                    }`}>
                    <role.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold">{role.label}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">{role.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              disabled={!identity}
              onClick={() => setStep('DETAILS')}
              className="w-full btn-primary py-4 text-lg font-bold disabled:opacity-50"
            >
              Continue
            </button>
          </motion.div>
        );

      case 'DETAILS':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {identity === 'TRAINER' ? 'Trainer Registration' : 'Basic Details'}
              </h2>
              <p className="text-[var(--text-secondary)]">A few more things to set up your profile</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1 mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[var(--accent-orange)] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1 mb-1.5 block">Email Address (For ID Delivery)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[var(--accent-orange)] focus:outline-none transition-all"
                />
              </div>

              {identity === 'TRAINER' ? (
                <div>
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1 mb-1.5 block">Profession Title</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="e.g. Senior Cricket Coach"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[var(--accent-orange)] focus:outline-none transition-all"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1 mb-1.5 block">Interests / Sports</label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[var(--accent-orange)] focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select a sport</option>
                    {sports.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider ml-1 mb-1.5 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[var(--accent-orange)] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep('IDENTITY')}
                className="w-1/3 py-4 rounded-xl bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep('PROFILE')}
                className="flex-1 btn-primary py-4 text-lg font-bold"
              >
                Continue
              </button>
            </div>
          </motion.div>
        );

      case 'PROFILE':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 text-center"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Upload Your Profile</h2>
              <p className="text-[var(--text-secondary)]">PNG/JPEG below 5MB</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden transition-all hover:border-[var(--accent-orange)]/50 cursor-pointer"
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-white/20" />
                  )}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <button
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[var(--accent-orange)] text-white flex items-center justify-center shadow-lg transform transition-transform active:scale-90"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={handleFinish}
                  disabled={isLoading}
                  className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Finish & Go Live'}
                </button>
                <button onClick={() => setStep('DETAILS')} className="text-white/40 text-sm font-medium hover:text-white transition-colors">
                  Go Back
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'WELCOME':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 relative">
              <CheckCircle className="w-10 h-10 text-green-400" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </div>

            <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Welcome {identity === 'TRAINER' ? 'Coach' : 'Champion'}!
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-sm mx-auto leading-relaxed">
              Your digital identity is ready and your Sports ID has been sent to your mail: <strong>{formData.email}</strong>
            </p>

            <div className="relative max-w-sm mx-auto mb-8 p-6 rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md">
              <div className="absolute top-0 right-0 p-4">
                <ShieldCheck className="w-6 h-6 text-[var(--accent-orange)]" />
              </div>
              <div className="flex items-center gap-4 text-left mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden border border-white/20">
                  <img src={profileImage || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=256'} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm tracking-tighter">Official National Sports Id</h4>
                  <p className="text-2xl font-black text-[var(--accent-orange)] tracking-widest" style={{ letterSpacing: '2px' }}>
                    {sportsId}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <div className="text-left">
                  <p className="text-[10px] uppercase text-white/40">Member Name</p>
                  <p className="text-sm font-bold text-white">{formData.fullName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-white/40">Identity</p>
                  <p className="text-sm font-bold text-white">{identity}</p>
                </div>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="btn-primary px-10 py-4 text-lg"
            >
              Start Exploring
            </button>
          </motion.div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={resetAndClose}
      />

      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg rounded-[2.5rem] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 27, 42, 0.9) 0%, rgba(11, 15, 23, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--accent-orange)] to-green-500"
            initial={{ width: '0%' }}
            animate={{
              width: step === 'PHONE' ? '16%' :
                step === 'OTP' ? '33%' :
                  step === 'IDENTITY' ? '50%' :
                    step === 'DETAILS' ? '66%' :
                      step === 'PROFILE' ? '83%' : '100%'
            }}
          />
        </div>

        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        <div className="px-8 py-10">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SportsPersonModal;
