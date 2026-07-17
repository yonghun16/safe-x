import React, { useState, type FormEvent } from 'react';
import { Camera, MapPin } from '../components/ui/Icons';
import Button from '../components/ui/Button';
import AppHeader from '../components/layout/AppHeader';
import PageContainer from '../components/layout/PageContainer';
import { usePostStore } from '../store/usePostStore';
import { useToastStore } from '../store/useToastStore';

const ReportScreen: React.FC = () => {
  const addPost = usePostStore((state) => state.addPost);
  const showToast = useToastStore((state) => state.showToast);

  const [reportTitle, setReportTitle] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [reportLevel, setReportLevel] = useState<'low' | 'medium' | 'high'>('high');
  const [simulatedPhoto, setSimulatedPhoto] = useState<string | null>(null);

  const handlePhotoSelect = () => {
    const colors = [
      'linear-gradient(135deg, #FF6B00 0%, #FF1A00 100%)',
      'linear-gradient(135deg, #FF8A00 0%, #D42100 100%)',
      'linear-gradient(135deg, #FF9F1C 0%, #E71D36 100%)'
    ];
    const picked = colors[Math.floor(Math.random() * colors.length)];
    setSimulatedPhoto(picked);
    showToast('현장 사진이 성공적으로 선택되었습니다!');
  };

  const handleReportSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim()) {
      showToast('제목을 입력해주세요.', 'error');
      return;
    }
    if (!reportContent.trim()) {
      showToast('내용을 입력해주세요.', 'error');
      return;
    }
    if (!reportLocation.trim()) {
      showToast('위치를 입력해주세요.', 'error');
      return;
    }

    let color1 = '#FF5C00';
    let color2 = '#3A1200';
    if (reportLevel === 'medium') {
      color1 = '#FF9500';
      color2 = '#2C1B00';
    } else if (reportLevel === 'low') {
      color1 = '#34C759';
      color2 = '#0B2D12';
    }

    addPost({
      title: reportTitle,
      location: reportLocation,
      description: reportContent,
      dangerLevel: reportLevel,
      imageColor1: color1,
      imageColor2: color2
    });

    setReportTitle('');
    setReportContent('');
    setReportLocation('');
    setReportLevel('high');
    setSimulatedPhoto(null);
  };

  return (
    <PageContainer>
      <AppHeader title="제보 등록" titleStyle={{ paddingLeft: '24px' }} />

      <form onSubmit={handleReportSubmit} className="report-container">
        <div className="report-section">
          <label className="report-label">사진 업로드</label>
          <div className="upload-box" onClick={handlePhotoSelect}>
            {simulatedPhoto ? (
              <div className="upload-preview">
                <div style={{ width: '100%', height: '100%', background: simulatedPhoto }} />
                <div className="upload-preview-overlay">사진 교체하기</div>
              </div>
            ) : (
              <>
                <Camera />
                <span>사진 선택</span>
              </>
            )}
          </div>
        </div>

        <div className="report-section">
          <label className="report-label">제목</label>
          <input
            type="text"
            className="report-input"
            placeholder="제목을 입력하세요"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
          />
        </div>

        <div className="report-section">
          <label className="report-label">내용</label>
          <textarea
            className="report-textarea"
            placeholder="내용을 입력하세요"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
          />
        </div>

        <div className="report-section">
          <label className="report-label">위치</label>
          <div className="report-location-wrapper">
            <input
              type="text"
              className="report-input"
              placeholder="위치를 입력하세요"
              value={reportLocation}
              onChange={(e) => setReportLocation(e.target.value)}
            />
            <span className="report-location-icon"><MapPin /></span>
          </div>
        </div>

        <div className="report-section" style={{ marginBottom: '32px' }}>
          <label className="report-label">위험도</label>
          <div className="level-radio-group">
            {(['low', 'medium', 'high'] as const).map((lvl) => (
              <label key={lvl} className="level-radio-label">
                <input
                  type="radio"
                  name="reportLevel"
                  checked={reportLevel === lvl}
                  onChange={() => setReportLevel(lvl)}
                />
                <span className="level-radio-btn">
                  <span className="level-radio-dot" />
                </span>
                <span>{lvl === 'low' ? '낮음' : lvl === 'medium' ? '보통' : '높음'}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit">등록하기</Button>
      </form>
    </PageContainer>
  );
};

export default ReportScreen;
