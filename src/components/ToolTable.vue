<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  tools: { type: Array, required: true },
});

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const search = ref('');
const status = ref('all');
const category = ref('all');
const sortBy = ref('name');

const categories = computed(() =>
  [...new Set(props.tools.map((t) => t.category))].sort()
);

const statuses = ['all', 'owned', 'wanted', 'sold', 'retired'];

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  let rows = props.tools.filter((t) => {
    if (status.value !== 'all' && t.status !== status.value) return false;
    if (category.value !== 'all' && t.category !== category.value) return false;
    if (!q) return true;
    const haystack = [t.name, t.brand, t.model, t.category, ...(t.tags ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });

  const by = sortBy.value;
  rows = [...rows].sort((a, b) => {
    if (by === 'priority') return (b.priority ?? 0) - (a.priority ?? 0);
    if (by === 'price') return (b.pricePaid ?? b.estimatedPrice ?? 0) - (a.pricePaid ?? a.estimatedPrice ?? 0);
    return a.name.localeCompare(b.name);
  });
  return rows;
});

const money = (n) =>
  typeof n === 'number'
    ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    : '—';
</script>

<template>
  <div class="tool-table">
    <div class="controls">
      <label>
        <span>Search</span>
        <input v-model="search" type="search" placeholder="name, brand, tag…" />
      </label>
      <label>
        <span>Status</span>
        <select v-model="status">
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
      </label>
      <label>
        <span>Category</span>
        <select v-model="category">
          <option value="all">all</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>
      <label>
        <span>Sort</span>
        <select v-model="sortBy">
          <option value="name">name</option>
          <option value="priority">priority</option>
          <option value="price">price</option>
        </select>
      </label>
    </div>

    <p class="count">{{ filtered.length }} of {{ tools.length }} tools</p>

    <ul class="tag-grid">
      <li v-for="t in filtered" :key="t.id" class="shop-tag">
        <h3><a :href="`${base}/tools/${t.id}`">{{ t.name }}</a></h3>
        <span class="badge" :class="`badge--${t.status}`">{{ t.status }}</span>
        <dl>
          <dt>Category</dt>
          <dd>{{ t.category }}</dd>
          <template v-if="t.brand">
            <dt>Brand</dt>
            <dd>{{ t.brand }}<span v-if="t.model"> {{ t.model }}</span></dd>
          </template>
          <template v-if="t.status === 'wanted' && t.priority">
            <dt>Priority</dt>
            <dd>{{ '★'.repeat(t.priority) }}</dd>
          </template>
          <template v-if="t.pricePaid">
            <dt>Paid</dt>
            <dd>{{ money(t.pricePaid) }}</dd>
          </template>
          <template v-else-if="t.estimatedPrice">
            <dt>Est.</dt>
            <dd>{{ money(t.estimatedPrice) }}</dd>
          </template>
          <template v-if="t.location">
            <dt>Stored</dt>
            <dd>{{ t.location }}</dd>
          </template>
        </dl>
      </li>
    </ul>

    <p v-if="filtered.length === 0" class="empty">
      No tools match these filters. Clear the search or widen the filters above.
    </p>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  background: var(--paper-deep);
  border: 1px solid var(--line);
  border-radius: 3px;
  padding: 0.9rem 1rem;
}

.controls label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.controls span {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--graphite);
}

.controls input,
.controls select {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--line);
  border-radius: 2px;
  background: #fffdf6;
  color: var(--walnut);
}

.controls input {
  min-width: 14rem;
}

.count,
.empty {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--graphite);
  margin: 0.75rem 0 0;
}

.empty {
  margin-top: 1.5rem;
}
</style>
