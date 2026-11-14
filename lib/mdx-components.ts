import WalkthroughStep from "@/components/WalkthroughStep";
import ComparisonPanel from "@/components/ComparisonPanel";
import AssumptionBreak from "@/components/AssumptionBreak";
import InstructorNote from "@/components/InstructorNote";
import AgentDiagram from "@/components/AgentDiagram";
import FlowDiagram from "@/components/FlowDiagram";
import {
  A, Blockquote, Callout, Card, CardGrid, H2, H3, LI, Lead, P, Pull, Reference,
  Strong, TBody, TD, TH, THead, TR, Table, UL,
} from "@/components/lesson/Elements";
import {
  CriteriaDiagram, CrossingDiagram, MapDiagram, ModelsABDiagram, SeenUnseenDiagram, ThreeTestsDiagram,
} from "@/components/lesson/Diagrams";

// Components exposed to chapter MDX bodies (CLAUDE.md §4 template), plus the
// lesson-styling elements (headings, lists, tables, callouts, diagrams).
export const chapterMdxComponents = {
  WalkthroughStep,
  ComparisonPanel,
  AssumptionBreak,
  InstructorNote,
  AgentDiagram,
  FlowDiagram,
  // element overrides
  h2: H2,
  h3: H3,
  p: P,
  strong: Strong,
  a: A,
  ul: UL,
  li: LI,
  table: Table,
  thead: THead,
  th: TH,
  tbody: TBody,
  tr: TR,
  td: TD,
  blockquote: Blockquote,
  // lesson components
  Callout,
  Card,
  CardGrid,
  Lead,
  Pull,
  Reference,
  SeenUnseenDiagram,
  CrossingDiagram,
  MapDiagram,
  ModelsABDiagram,
  CriteriaDiagram,
  ThreeTestsDiagram,
};
