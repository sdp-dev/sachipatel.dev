import SectionHeader from './SectionHeader';
import { stack } from '../data/stack';
import './Stack.css';

const Stack = () => (
  <section id="stack" className="section-block">
    <SectionHeader n="04" title="stack.toml" sub="things I reach for" />
    <div className="stack-grid">
      {stack.map((group) => (
        <div key={group.group} className="stack-col">
          <div className="box-label mono">[{group.group}]</div>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Stack;
