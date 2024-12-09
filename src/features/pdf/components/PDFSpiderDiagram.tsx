import { SkillArea, SkillAreaID, SkillAreaIDValues } from '@/lib/content-types';
import { Circle, G, Path, Svg, Text, View } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { calcHexPath, calcStatPath, calculateCirclePoint } from '@/components/SpiderDiagram/helpers';
import { PDFSkillAreaIcon } from '@/features/pdf/icons/PDFIcons';

export type TotalScoreRecord = Record<SkillAreaID, number | undefined>;

export const PDFSpiderDiagram = ({
  skillAreas,
  totalScores,
}: {
  skillAreas: Pick<SkillArea, 'id' | 'name'>[];
  totalScores: TotalScoreRecord;
}) => {
  const { t } = useTranslation();
  const viewBox = 450;
  const dotSize = viewBox / 100;
  const iconSize = 50;

  return (
    <View style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Text
        style={{
          fontSize: 12,
          textAlign: 'left',
          fontFamily: 'Poppins',
          fontWeight: 600,
          marginBottom: 2,
          alignSelf: 'flex-start',
        }}
      >
        {t('components.spider.title')}
      </Text>
      <Svg viewBox={`0 -${viewBox * 0.14} ${viewBox} ${viewBox * 1.25}`} style={{ width: '467pt', height: '350pt' }}>
        {/* Base hexagons */}
        <G>
          <Path d={calcHexPath(viewBox, (viewBox / 26) * 10)} style={{ stroke: '#ccc', strokeWidth: 1 }} />
          <Path d={calcHexPath(viewBox, (viewBox / 26) * 8)} style={{ stroke: '#ccc', strokeWidth: 1 }} />
          <Path d={calcHexPath(viewBox, (viewBox / 26) * 6)} style={{ stroke: '#ccc', strokeWidth: 1 }} />
          <Path d={calcHexPath(viewBox, (viewBox / 26) * 4)} style={{ stroke: '#ccc', strokeWidth: 1 }} />
          <Path d={calcHexPath(viewBox, (viewBox / 26) * 2)} style={{ stroke: '#ccc', strokeWidth: 1 }} />
        </G>

        {/* Skill area stats line */}
        <Path
          d={calcStatPath(
            viewBox,
            SkillAreaIDValues.map((section) => {
              const sectionScore = totalScores[section];

              return (((sectionScore !== undefined ? sectionScore + 0.5 : 0) * viewBox) / 3.5 / 26) * 10;
            }),
          )}
          style={{ stroke: 'black', strokeWidth: 2, fill: 'none' }}
        />

        {/* Skill area stats dots */}
        <G>
          {SkillAreaIDValues.map((section, i) => {
            const sectionScore = totalScores[section];

            const { x, y } = calculateCirclePoint(
              viewBox,
              (((sectionScore !== undefined ? sectionScore + 0.5 : 0) * viewBox) / 3.5 / 26) * 10 - 1,
              i,
            );

            return <Circle key={section} cx={x} cy={y} r={dotSize} fill="black" />;
          })}
        </G>

        {/* Skill area icons and labels */}
        <G>
          {SkillAreaIDValues.map((section, i) => {
            const { x, y } = calculateCirclePoint(viewBox, viewBox / 2 - 2, i);
            const textOffset = i === 1 || i === 2 ? 100 : i === 4 || i === 5 ? -100 : 0;

            return (
              <G key={section} transform={`translate(${x - iconSize / 2 + textOffset}, ${y - iconSize / 2 - 10})`}>
                <PDFSkillAreaIcon skillArea={section} size={iconSize} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    transform: 'translate(0, 40)',
                  }}
                  x={iconSize / 2}
                  y={iconSize / 2}
                  textAnchor="middle"
                >
                  {skillAreas.find((a) => a.id === section)?.name ?? ''}
                </Text>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

PDFSpiderDiagram.displayName = 'PDFSpiderDiagram';
