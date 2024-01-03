import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import {
  okozukaiBoardHistoriesTable,
  okozukaiBoardSchedulesTable,
} from '#/infrastructures/db/okozukai_keeper_3/schema';
import { dateShortFormats } from '^/utils/dfUtils';
import { format, getDate } from 'date-fns';
import { and, asc, eq, lte, notExists } from 'drizzle-orm';

/**
 * おこづかいスケジュールの実行
 * スケジュールに応じて、日次、月次等の処理を実行する
 */
async function executeOkozukaiBoardSchedules() {
  // 日次スケジュール実行
  await daily();

  // 週次スケジュール実行
  // await weekly();

  // 月次スケジュール実行
  await monthly();

  // 年次スケジュール実行
  // await yearly();
}

/**
 * 日次実行
 * 日次で行うべき処理を実行する
 */
async function daily() {
  // 今日の日付を取得する
  const today = format(new Date(), ...dateShortFormats);

  const qb = dz
    .select()
    .from(okozukaiBoardSchedulesTable)
    .where(
      and(
        eq(okozukaiBoardSchedulesTable.type, 'daily'),
        lte(okozukaiBoardSchedulesTable.firstDate, today),
        notExists(
          dz
            .select()
            .from(okozukaiBoardHistoriesTable)
            .where(
              and(
                eq(
                  okozukaiBoardHistoriesTable.okozukaiBoardId,
                  okozukaiBoardSchedulesTable.okozukaiBoardId,
                ),
                eq(
                  okozukaiBoardHistoriesTable.okozukaiBoardScheduleId,
                  okozukaiBoardSchedulesTable.id,
                ),
                // 今日の記録がまだないかをチェック
                eq(okozukaiBoardHistoriesTable.date, today),
              ),
            ),
        ),
      ),
    )
    // スケジュールを作成時刻の昇順でソート
    .orderBy(asc(okozukaiBoardSchedulesTable.createdAt))
    // 再利用可能なクエリビルダを生成
    .$dynamic();

  // ページング処理用の変数
  const limit = 1000;
  let offset = 0;

  // ページング処理を行いながらスケジュールを取得し処理
  while (true) {
    const schedules = await qb.limit(limit).offset(offset);
    if (schedules.length <= 0) {
      break;
    }

    for (const schedule of schedules) {
      await dz
        .insert(okozukaiBoardHistoriesTable)
        .values({
          okozukaiBoardId: schedule.okozukaiBoardId,
          okozukaiBoardScheduleId: schedule.id,
          title: schedule.title,
          value: schedule.value,
          date: today,
        })
        // 既にレコードが存在していた場合は何もしない
        .onConflictDoNothing();
    }

    // 次のページを取得するためのオフセットを更新
    offset += limit;
  }
}

/**
 * 月次実行
 * 月次で行うべき処理を実行する
 */
async function monthly() {
  // 今日の日付を取得する
  const today = format(new Date(), ...dateShortFormats);

  const qb = dz
    .select()
    .from(okozukaiBoardSchedulesTable)
    .where(
      and(
        eq(okozukaiBoardSchedulesTable.type, 'monthly'),
        lte(okozukaiBoardSchedulesTable.firstDate, today),
        notExists(
          dz
            .select()
            .from(okozukaiBoardHistoriesTable)
            .where(
              and(
                eq(
                  okozukaiBoardHistoriesTable.okozukaiBoardId,
                  okozukaiBoardSchedulesTable.okozukaiBoardId,
                ),
                eq(
                  okozukaiBoardHistoriesTable.okozukaiBoardScheduleId,
                  okozukaiBoardSchedulesTable.id,
                ),
                // 今日の記録がまだないかをチェック
                eq(okozukaiBoardHistoriesTable.date, today),
              ),
            ),
        ),
      ),
    )
    // スケジュールを作成時刻の昇順でソート
    .orderBy(asc(okozukaiBoardSchedulesTable.createdAt))
    // 再利用可能なクエリビルダを生成
    .$dynamic();

  // ページング処理用の変数
  const limit = 1000;
  let offset = 0;

  while (true) {
    const _schedules = await qb.limit(limit).offset(offset);
    if (_schedules.length <= 0) {
      break;
    }

    // 今日と同じ日に設定されたスケジュールのみを抽出
    const schedules = _schedules.filter(
      (v) => getDate(new Date(v.firstDate)) === getDate(new Date(today)),
    );

    for (const schedule of schedules) {
      await dz
        .insert(okozukaiBoardHistoriesTable)
        .values({
          okozukaiBoardId: schedule.okozukaiBoardId,
          okozukaiBoardScheduleId: schedule.id,
          title: schedule.title,
          value: schedule.value,
          date: today,
        })
        // 既にレコードが存在していた場合は何もしない
        .onConflictDoNothing();
    }

    // 次のページを取得するためのオフセットを更新
    offset += limit;
  }
}

// スケジュール実行関数を呼び出す
void executeOkozukaiBoardSchedules();
