import { SkillArea } from '@/lib/content-types';
import { Answer } from '@/stores/careerPlanningAnswersStore';
import { G, Line, Rect, Svg, Text, View } from '@react-pdf/renderer';
import { getFillColor } from '../utils';
import { PDFSkillAreaIcon } from '../icons/PDFIcons';
import { useTranslation } from 'react-i18next';

/**
 * Hacky function for text wrap in svg
 */
const wrapText = (text: string, len: number): string[] => {
  return text.split(' ').reduce((acc, cur) => {
    const index = acc.length - 1;

    if (index < 0 || acc[index].length + cur.length > len) {
      acc.push(cur);
      return acc;
    }

    acc[index] = [acc[index], cur].join(' ');

    return acc;
  }, [] as string[]);
};

export const PDFBarDiagram = ({
  index,
  skillArea,
  answers,
  feedback,
}: {
  index: number;
  skillArea: Pick<SkillArea, 'id' | 'name' | 'longName' | 'sections' | 'feedbacks'>;
  answers: Answer[];
  feedback: string | undefined;
}) => {
  const { t } = useTranslation();

  // Remap here so i can get index cleanly
  const sectionScores = skillArea.sections.map((section) => {
    const answerList = section.questions.flatMap((question) => {
      return answers.find((a) => a.questionId === question.id && a.sectionId === section.id)?.score ?? [];
    });

    const score = answerList.length ? answerList.reduce((c, a) => c + a, 0) / answerList.length : undefined;

    return { score, sectionId: section.id, name: section.name };
  });

  const fillColor = getFillColor(skillArea.id);

  const viewboxWidth = 460;

  const barViewboxHeight = 160;
  const barContentWidth = viewboxWidth * 0.8;
  const barSpacing = barContentWidth / (sectionScores.length * 2);
  const barMaxHeight = barViewboxHeight * 0.65;

  return (
    <View style={{ width: viewboxWidth, padding: 0 }}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 16, height: 47, alignItems: 'center' }}>
        <Svg style={{ padding: 0, margin: 0, width: 40 }} viewBox={`0 0 40 40`}>
          <PDFSkillAreaIcon skillArea={skillArea.id} size={40} />
        </Svg>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              fontFamily: 'Poppins',
              fontWeight: 600,
            }}
          >
            {`${index}.${skillArea.name}`}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                fontSize: 8,
                textAlign: 'left',
                fontFamily: 'Arimo',
                backgroundColor: '#E4E5E9',
                borderRadius: '100%',
                fontWeight: 400,
              }}
            >
              {`${skillArea.longName}`}
            </Text>
          </View>
        </View>
      </View>

      <Text
        style={{
          fontSize: 12,
          fontFamily: 'Arimo',
          fontWeight: 400,
          marginTop: 12,
          marginBottom: 16,
          height: 85,
        }}
      >
        {feedback ?? t('components.bar.no-feedback')}
      </Text>

      {feedback ? (
        <Svg style={{ width: '100%' }} viewBox={`0 -8 ${viewboxWidth} ${barViewboxHeight - 8}`}>
          <G
            style={{
              fontSize: 10,
              fontFamily: 'Arimo',
              fontWeight: 400,
            }}
          >
            <Text x={0} y={3}>
              {t('common.answer-scale.3')}
            </Text>
            <Text x={0} y={barMaxHeight + 4}>
              {t('common.answer-scale.0')}
            </Text>
          </G>

          <G transform={`translate(${viewboxWidth * 0.15}, 0)`}>
            <G stroke="#E4E5E9">
              <Line x1={0} x2={barContentWidth} y1={0} y2={0} />
              <Line x1={0} x2={barContentWidth} y1={(barMaxHeight * 1) / 3} y2={(barMaxHeight * 1) / 3} />
              <Line x1={0} x2={barContentWidth} y1={(barMaxHeight * 2) / 3} y2={(barMaxHeight * 2) / 3} />
              <Line strokeWidth={2} x1={0} x2={barContentWidth + 1} y1={barMaxHeight + 1} y2={barMaxHeight} />
            </G>

            <G>
              {sectionScores.map(({ score, sectionId, name }, i) => {
                const barHeight = score !== undefined ? (barMaxHeight * score) / 3 : 0;

                const minBarHeight = barMaxHeight / 30;

                const flooredBarHeight = score === undefined || barHeight > minBarHeight ? barHeight : minBarHeight;

                // TODO: dynamic size?
                const wrappedTitleStrings = wrapText(name, 10);

                return (
                  <G key={`${index}-${sectionId}`}>
                    <Rect
                      fill={fillColor}
                      x={barSpacing * (i * 2 + 0.5)}
                      y={barMaxHeight - flooredBarHeight}
                      rx={viewboxWidth / 200}
                      ry={viewboxWidth / 200}
                      width={barSpacing}
                      height={flooredBarHeight}
                    />

                    {[`${index}.${sectionId}`, ...wrappedTitleStrings].map((text, j) => (
                      <Text
                        style={{
                          fontSize: 8,
                          fontFamily: 'Arimo',
                          fontWeight: 400,
                          width: barSpacing * 1.8,
                          fill: '#55575E',
                        }}
                        key={`text-row-${j}`}
                        x={barSpacing * (i * 2 + 1)}
                        y={barMaxHeight + 12 + 12 * j}
                        textAnchor="middle"
                      >
                        {text}
                      </Text>
                    ))}
                  </G>
                );
              })}
            </G>
          </G>
        </Svg>
      ) : (
        <Svg style={{ width: '100%' }} viewBox={`0 -8 ${viewboxWidth} ${barViewboxHeight - 8}`}></Svg>
      )}
    </View>
  );
};
