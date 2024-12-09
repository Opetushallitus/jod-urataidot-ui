import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCareerPlanningAnswersStore } from './careerPlanningAnswersStore';

const testSkillAreaId = 'know-yourself';

describe('useCareerPlanningAnswersStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useCareerPlanningAnswersStore.setState({ answers: [] });
  });

  it('should set a new score', () => {
    const store = useCareerPlanningAnswersStore.getState();

    // Set a score
    store.setScore({
      score: 3,
      questionId: 1,
      sectionId: 2,
      skillAreaId: testSkillAreaId,
    });

    const answers = useCareerPlanningAnswersStore.getState().answers;

    expect(answers).toHaveLength(1);
    expect(answers[0]).toEqual({
      skillAreaId: testSkillAreaId,
      sectionId: 2,
      questionId: 1,
      score: 3,
    });
  });

  it('should update an existing score', () => {
    const store = useCareerPlanningAnswersStore.getState();

    // Set an initial score
    store.setScore({
      score: 2,
      questionId: 1,
      sectionId: 2,
      skillAreaId: testSkillAreaId,
    });

    // Update the score
    store.setScore({
      score: 3,
      questionId: 1,
      sectionId: 2,
      skillAreaId: testSkillAreaId,
    });

    const answers = useCareerPlanningAnswersStore.getState().answers;

    // Check that the score is updated
    expect(answers).toHaveLength(1);
    expect(answers[0].score).toBe(3);
  });

  it('should remove an answer when score is undefined', () => {
    const store = useCareerPlanningAnswersStore.getState();

    // Set a score
    store.setScore({
      score: 2,
      questionId: 1,
      sectionId: 2,
      skillAreaId: testSkillAreaId,
    });

    // Remove the answer by setting score to undefined
    store.setScore({
      score: undefined,
      questionId: 1,
      sectionId: 2,
      skillAreaId: testSkillAreaId,
    });

    const answers = useCareerPlanningAnswersStore.getState().answers;

    // Check that the answer is removed
    expect(answers).toHaveLength(0);
  });

  it('should retrieve the correct score for a given question', () => {
    const store = useCareerPlanningAnswersStore.getState();

    // Set a score
    store.setScore({
      score: 3,
      questionId: 1,
      sectionId: 2,
      skillAreaId: testSkillAreaId,
    });

    // Get the score
    const score = store.getScore({
      questionId: 1,
      sectionId: 2,
      skillAreaId: testSkillAreaId,
    });

    expect(score).toBe(3);
  });

  it('should return undefined for non-existent scores', () => {
    const store = useCareerPlanningAnswersStore.getState();

    // Get a score that doesn't exist
    const score = store.getScore({
      questionId: 999,
      sectionId: 999,
      skillAreaId: testSkillAreaId,
    });

    expect(score).toBeUndefined();
  });

  it('should generate an encoded link', () => {
    const store = useCareerPlanningAnswersStore.getState();

    // Set a score
    store.setScore({
      score: 3,
      questionId: 1,
      sectionId: 2,
      skillAreaId: testSkillAreaId,
    });

    const encodedLink = store.getEncodedData();

    // Check that the encoded link is a valid base64 string
    expect(encodedLink).toMatch(/([A-Za-z0-9+/=]+)$/);
  });

  it('should decode and set the state from encoded data', () => {
    const store = useCareerPlanningAnswersStore.getState();

    // Sample encoded data:
    // [
    //   { skillAreaId: 0, sectionId: 1, questionId: 1, score: 0 },
    //   { skillAreaId: 0, sectionId: 2, questionId: 1, score: 3 }
    // ]
    const encodedData = btoa(
      JSON.stringify({
        data: [
          [0, 1, 1, 0],
          [0, 2, 1, 3],
        ],
        version: 1,
      }),
    );

    const result = store.setStateWithEncodedData(encodedData);

    expect(result.error).toBeNull();

    const answers = useCareerPlanningAnswersStore.getState().answers;

    // Check that the state is set correctly from the decoded data
    expect(answers).toHaveLength(2);
    expect(answers[0]).toEqual({
      skillAreaId: testSkillAreaId,
      sectionId: 1,
      questionId: 1,
      score: 0,
    });
    expect(answers[1]).toEqual({
      skillAreaId: testSkillAreaId,
      sectionId: 2,
      questionId: 1,
      score: 3,
    });
  });

  it('should return an error for invalid encoded data', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const store = useCareerPlanningAnswersStore.getState();

    const invalidEncodedData = 'thisStringShouldNotBeCorrect';

    const result = store.setStateWithEncodedData(invalidEncodedData);

    expect(result.error).toBeTruthy();
  });
});
