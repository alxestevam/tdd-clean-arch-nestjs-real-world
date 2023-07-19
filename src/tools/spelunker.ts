import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'fs';
import { SpelunkerModule } from 'nestjs-spelunker';
import { AppModule } from '../app.module';
import { Logger } from '@nestjs/common';

export const generateDepGraph = async () => {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Spelunker');

  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  const mermaidEdges = edges
    .filter(
      ({ from, to }) =>
        !(
          from.module.name === 'ConfigHostModule' ||
          from.module.name === 'LoggerModule' ||
          to.module.name === 'ConfigHostModule' ||
          to.module.name === 'LoggerModule'
        ),
    )
    .map(({ from, to }) => `${from.module.name}-->${to.module.name}`);

  writeFileSync('graph.mmd', `graph TD\n\t${mermaidEdges.join('\n\t')}`);

  logger.log('Graph generated in "graph.mmd"');
  logger.log('To visualize the graph:');
  logger.log('Copy and paste graph content in "https://mermaid.live/"');

  await app.close();
};

generateDepGraph();
