import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testPlacemarks, musicCategory, location, pubCategory } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {
  let placemarkList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks();
    placemarkList = await db.categoryStore.addCategory(musicCategory);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(placemarkList._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const pubList = await db.categoryStore.addCategory(pubCategory);
    const placemark = await db.placemarkStore.addPlacemark(pubList._id, location);
    assert.isNotNull(placemark._id);
    assertSubset(location, placemark);
  });

  test("get multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getPlacemarksByCategoryId(placemarkList._id);
    assert.equal(placemarks.length, testPlacemarks.length);
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const pubList = await db.categoryStore.addCategory(pubCategory);
    const placemark = await db.placemarkStore.addPlacemark(pubList._id, location);
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset(location, newPlacemark);
  });

  test("delete One placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategories.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategories.length);
  });
});
