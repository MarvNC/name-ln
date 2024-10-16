import { assertEquals } from 'https://deno.land/std@0.106.0/testing/asserts.ts';
import { generateName, type BookData } from './name.ts';

Deno.test('generateName test with string date', () => {
  const bookData: BookData = {
    author: '白石定規',
    date: '20241013',
    title: '魔女の旅々２３',
    publisher: 'SBクリエイティブ',
    label: 'ＧＡノベル',
    retailer: 'Bookwalker',
  };
  const expected =
    '[白石定規] 20241013 - v01 魔女の旅々２３ (SBクリエイティブ - ＧＡノベル) (Bookwalker)';
  const result = generateName(bookData);
  assertEquals(result, expected);
});

Deno.test('generateName test with Date object', () => {
  const bookData: BookData = {
    author: '白石定規',
    date: new Date('2024-10-13'),
    title: '魔女の旅々２３',
    publisher: 'SBクリエイティブ',
    label: 'ＧＡノベル',
    retailer: 'Bookwalker',
  };
  const expected =
    '[白石定規] 20241013 - v01 魔女の旅々２３ (SBクリエイティブ - ＧＡノベル) (Bookwalker)';
  const result = generateName(bookData);
  assertEquals(result, expected);
});

Deno.test('generateName test with cleaned author string', () => {
  const bookData: BookData = {
    author: '大木戸　いずみ',
    date: '20241015',
    title:
      '歴史に残る悪女になるぞ ７　悪役令嬢になるほど王子の溺愛は加速するようです！【電子特典付き】',
    publisher: 'KADOKAWA',
    label: 'ビーズログ文庫',
    retailer: 'Bookwalker',
  };
  const expected =
    '[大木戸いずみ] 20241015 - v01 歴史に残る悪女になるぞ ７　悪役令嬢になるほど王子の溺愛は加速するようです！【電子特典付き】 (KADOKAWA - ビーズログ文庫) (Bookwalker)';
  const result = generateName(bookData);
  assertEquals(result, expected);
});
