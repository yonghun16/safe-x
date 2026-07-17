import React, { useRef, useState, type FormEvent, type ChangeEvent, useEffect } from 'react';
import { Camera, MapPin, ChevronLeft } from '../components/ui/Icons';
import Button from '../components/ui/Button';
import AppHeader from '../components/layout/AppHeader';
import PageContainer from '../components/layout/PageContainer';
import PostImage from '../features/posts/components/PostImage';
import { usePostStore } from '../store/usePostStore';
import { useNavigationStore } from '../store/useNavigationStore';
import { useToastStore } from '../store/useToastStore';
import { compressImageToBase64, estimateBase64SizeKB } from '../utils/image';

const getDangerColors = (level: 'low' | 'medium' | 'high') => {
  if (level === 'medium') {
    return { imageColor1: '#FF9500', imageColor2: '#2C1B00' };
  }
  if (level === 'low') {
    return { imageColor1: '#34C759', imageColor2: '#0B2D12' };
  }
  return { imageColor1: '#FF5C00', imageColor2: '#3A1200' };
};

const EditScreen: React.FC = () => {
  const posts = usePostStore((state) => state.posts);
  const updatePost = usePostStore((state) => state.updatePost);
  const isSubmitting = usePostStore((state) => state.isSubmitting);
  const selectedPostId = useNavigationStore((state) => state.selectedPostId);
  const setScreen = useNavigationStore((state) => state.setScreen);
  const showToast = useToastStore((state) => state.showToast);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Find the post being edited
  const post = posts.find((p) => p.id === selectedPostId);

  // States initialized with post values directly on creation (lazy initializer)
  const [reportTitle, setReportTitle] = useState(() => post?.title ?? '');
  const [reportContent, setReportContent] = useState(() => post?.description ?? '');
  const [reportLocation, setReportLocation] = useState(() => post?.location ?? '');
  const [reportLevel, setReportLevel] = useState<'low' | 'medium' | 'high'>(() => post?.dangerLevel ?? 'high');
  const [imageBase64, setImageBase64] = useState<string | null>(() => post?.imageBase64 ?? null);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);

  // Redirect if post not found
  useEffect(() => {
    if (!post) {
      showToast('해당 게시글을 찾을 수 없습니다.', 'error');
      setScreen('home');
    }
  }, [post, setScreen, showToast]);

  const previewPost = {
    imageBase64: imageBase64 ?? undefined,
    ...getDangerColors(reportLevel),
  };

  const handlePhotoSelect = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    setIsPhotoLoading(true);
    try {
      const base64 = await compressImageToBase64(file);
      const sizeKB = estimateBase64SizeKB(base64);

      if (sizeKB > 900) {
        showToast('이미지 용량이 너무 큽니다. 더 작은 사진을 선택해주세요.', 'error');
        return;
      }

      setImageBase64(base64);
      showToast('현장 사진이 변경되었습니다.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '사진 처리에 실패했습니다.';
      showToast(message, 'error');
    } finally {
      setIsPhotoLoading(false);
    }
  };

  const handleReportSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!post) return;

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
    if (!imageBase64) {
      showToast('사진을 선택해주세요.', 'error');
      return;
    }

    const colors = getDangerColors(reportLevel);

    try {
      await updatePost(post.id, {
        title: reportTitle.trim(),
        location: reportLocation.trim(),
        description: reportContent.trim(),
        dangerLevel: reportLevel,
        imageBase64,
        ...colors,
      });

      // Navigate back to detail screen
      setScreen('detail');
    } catch {
      // Toast error is handled in store
    }
  };

  const handleBack = () => {
    setScreen('detail');
  };

  if (!post) {
    return null;
  }

  return (
    <PageContainer>
      <AppHeader
        title="제보 수정"
        left={
          <button type="button" className="header-btn" onClick={handleBack}>
            <ChevronLeft />
          </button>
        }
      />

      <form onSubmit={handleReportSubmit} className="report-container">
        <div className="report-section">
          <label className="report-label">사진 업로드</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          <div className="upload-box" onClick={handlePhotoSelect}>
            {imageBase64 ? (
              <div className="upload-preview">
                <PostImage
                  post={previewPost}
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="upload-preview-overlay">
                  {isPhotoLoading ? '처리 중...' : '사진 교체하기'}
                </div>
              </div>
            ) : (
              <>
                <Camera />
                <span>{isPhotoLoading ? '사진 처리 중...' : '사진 선택'}</span>
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

        <Button type="submit" isLoading={isSubmitting} loadingText="수정 중...">
          수정하기
        </Button>
      </form>
    </PageContainer>
  );
};

export default EditScreen;
