import { browserGroups } from './workspaceData';

export function DawBrowser() {
  return (
    <aside className="daw-browser" aria-label="Lukulu DAW browser">
      {browserGroups.map((group, groupIndex) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <ul>
            {group.items.map((item, itemIndex) => (
              <li
                className={groupIndex === 0 && itemIndex === 0 ? 'active' : undefined}
                key={item}
              >
                <span aria-hidden="true">
                  {groupIndex === 0 ? '◈' : groupIndex === 1 ? '▣' : '◇'}
                </span>
                {item}
                {item === 'Assignments' && <strong>4</strong>}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="premium-card">
        <span aria-hidden="true">♛</span>
        <h2>Go Premium</h2>
        <p>Unlock all practice packs and premium sound lessons.</p>
        <button type="button">Upgrade</button>
      </section>
    </aside>
  );
}
