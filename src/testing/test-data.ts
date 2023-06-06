import { useEffect, useState } from 'react';

export const testData = {
  users: [
    {
      id: 'KV4Lv9yUHtNVB42V0ZrFf',
      createdAt: 1645628972465,
      email: 'user1@test.com',
      password: 'test@123',
      categoryId: 'amYXmIyT9mD9GyO6CCr',
    },
  ],
  categories: [
    {
      id: 'amYXmIyT9mD9GyO6CCr',
      createdAt: 1645628972465,
      adminId: 'KV4Lv9yUHtNVB42V0ZrFf',
      name: 'Test Org 1',
      email: 'org1@test.com',
      phone: '944-528-1711',
      info: 'Totam alias fuga enim esse ullam sit. Nisi animi ut at voluptatem odit nam ea. Et fuga consequatur similique asperiores non suscipit corrupti aperiam. Molestiae quae aut laborum soluta blanditiis cupiditate hic nobis provident.Et quae aut labore aut rerum. Nisi at autem. Enim ipsum enim consectetur sequi consequatur. Sint qui qui quam. Voluptas dignissimos rem et natus. Autem et mollitia hic suscipit illum placeat.Optio aut sit assumenda quo eius omnis sed non consequatur. Numquam perferendis ea sit rerum officia cupiditate aut itaque doloremque. Itaque alias est repellendus. Esse consectetur tenetur velit autem excepturi. Velit perspiciatis saepe dolorum fugiat. Adipisci odio porro quibusdam similique sunt temporibus ipsam.Dolor assumenda aut qui et in perferendis et. Possimus quam qui impedit. Nesciunt aliquid qui consequatur possimus eos velit deserunt magni qui. Nam accusantium libero corrupti.Nulla in ut sunt rerum voluptatem rerum voluptates. Quis expedita natus earum similique officiis rem. Possimus similique architecto ut ad ea quia laborum. Officia voluptatibus quos aliquid delectus. Est voluptates necessitatibus iure et provident iusto at voluptatem sit. Molestiae exercitationem repellat tempore. Id excepturi officiis iste ullam similique et hic sit. Quis et eaque quidem. Qui voluptas ea et rem recusandae suscipit voluptatem sit. Sint ut officiis nihil perferendis nihil quibusdam molestiae. Blanditiis nihil ab illo. Voluptatem mollitia officia aperiam. Esse voluptatum voluptatem nihil minima. Placeat itaque aut numquam. Quis nobis commodi voluptatum ipsum perspiciatis aut. Omnis nulla enim natus architecto in. Autem ab aperiam vitae ipsa quia. Adipisci deleniti voluptas ea nam nesciunt. Doloribus delectus modi et. Voluptatem qui sit eaque qui totam. In facilis excepturi et quae et ullam maiores et sit. Enim consequatur dolorem dolorem eum ullam rerum cum similique odit. Aut velit rem est id et tenetur ut. Velit sunt et velit odit qui mollitia aut harum aut. Cupiditate doloribus dicta reprehenderit aliquid consequatur eum voluptas veritatis. Ut corporis sed et magni consequatur voluptatem.',
    },
  ],
  stories: [
    {
      id: '1',
      categoryId: '1',
      title: 'Lorem ipsum dolor sit amet',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id semper risus. Nullam vestibulum metus ut elit interdum, sed vulputate mauris mollis. Fusce in neque lacinia, suscipit justo eu, volutpat lacus. Proin dignissim dignissim neque, in dapibus mauris finibus a. Morbi commodo nibh sit amet turpis lacinia, sed feugiat nunc tempus. Integer congue tellus purus, vel vulputate orci fringilla ut. Nulla vestibulum felis a libero tincidunt, non luctus justo porttitor. Curabitur ac ultricies est.',
      createdAt: 1657868400,
      updatedAt: 1657868400,
    },
    {
      id: '2',
      categoryId: '1',
      title: 'Vestibulum id semper risus',
      body: 'Vestibulum id semper risus. Fusce vitae ultrices enim. Curabitur tristique nibh quis quam elementum, sed tempus tellus congue. Integer dapibus leo vitae nulla ultrices, a hendrerit mi consequat. Proin ut ligula lacinia, rhoncus nunc eget, gravida quam. Donec a sapien ex. Sed sed placerat metus, ut lobortis dolor. Sed hendrerit convallis ante eu consequat. Morbi accumsan vestibulum convallis. Aliquam et mauris interdum, malesuada augue sed, tincidunt nunc. Sed a vulputate nibh. Nullam varius faucibus dolor at scelerisque. Nulla facilisi.',
      createdAt: 1657778400,
      updatedAt: 1657778400,
    },
    {
      id: '3',
      categoryId: '1',
      title: 'Nullam vestibulum metus ut elit',
      body: 'Nullam vestibulum metus ut elit interdum, sed vulputate mauris mollis. Morbi non facilisis quam. Sed luctus a elit id pretium. Sed tincidunt pharetra odio id pulvinar. Vestibulum feugiat massa sapien, ut facilisis diam lacinia at. Suspendisse ultricies, mi nec commodo bibendum, purus nisi ultrices lorem, nec feugiat purus orci id purus. Integer sit amet metus eu turpis commodo laoreet at eget odio. Proin consectetur semper volutpat. Nam euismod leo vitae suscipit dictum. Curabitur eleifend est eu lorem facilisis, in pulvinar sapien iaculis. Nunc pharetra tellus mauris, sit amet condimentum massa feugiat et. Aenean faucibus justo ac libero tristique, in mollis neque posuere. Vestibulum bibendum lectus at lacinia vulputate. Mauris finibus elit risus, eget volutpat tortor dapibus id. Integer varius, dolor id tincidunt sagittis, lectus nisl volutpat dui, sit amet eleifend ligula tortor eget erat. Vestibulum varius, mauris sed laoreet pulvinar, felis nisi consequat mi, id laoreet eros diam id mi.',
      createdAt: 1657688400,
      updatedAt: 1657688400,
    },
    {
      id: '4',
      categoryId: '1',
      title: 'Proin dignissim dignissim neque',
      body: 'Proin dignissim dignissim neque, in dapibus mauris finibus a. Aliquam a tristique dolor. Integer scelerisque hendrerit justo id laoreet. Duis tempor hendrerit enim, a tristique justo lacinia ac. Aliquam vitae consectetur mauris, non feugiat neque. Sed volutpat leo nec arcu elementum malesuada. Aliquam interdum turpis in nisl luctus, id sagittis orci vestibulum. Aliquam congue elit enim, eu suscipit est tempus vel. Mauris eu ipsum id justo tristique dignissim a eu tellus. Mauris auctor dapibus neque, et rutrum odio pulvinar sed. Nam pulvinar, arcu et commodo dignissim, erat metus auctor turpis, eget gravida arcu felis at libero. Vestibulum nec vestibulum quam, at luctus elit. Sed fringilla eleifend magna, sed condimentum velit viverra in. Integer sed fringilla risus, non luctus metus.',
      createdAt: 1657598400,
      updatedAt: 1657598400,
    },
    {
      id: '5',
      categoryId: '1',
      title: 'Morbi commodo nibh sit amet',
      body: 'Morbi commodo nibh sit amet turpis lacinia, sed feugiat nunc tempus. Praesent in urna nisi. Aenean placerat quam a eleifend aliquet. Curabitur porttitor ligula non neque vulputate, in bibendum leo maximus. Donec id justo eget purus venenatis iaculis vitae in lacus. In hac habitasse platea dictumst. Integer fermentum arcu felis, sed commodo nunc blandit sit amet. Sed consectetur magna vitae venenatis lobortis. Suspendisse id nisl condimentum, posuere mi ac, bibendum libero. Nam eleifend, dui sit amet consequat cursus, nibh mi volutpat libero, ut vulputate turpis sapien sed quam. Fusce feugiat aliquam velit, a commodo erat congue in. Vestibulum tempor ligula et arcu posuere viverra. Aliquam rhoncus venenatis nunc a pellentesque. Nulla facilisi.',
      createdAt: 1657508400,
      updatedAt: 1657508400,
    },
    {
      id: '6',
      categoryId: '1',
      title: 'Integer congue tellus purus',
      body: 'Integer congue tellus purus, vel vulputate orci fringilla ut. Ut vel efficitur mi. Fusce malesuada sapien at dolor tincidunt, ut bibendum risus semper. Etiam ornare aliquam justo. Aliquam erat volutpat. Pellentesque nec purus at ipsum vulputate gravida sed vitae enim. Morbi iaculis posuere enim, ac tempor lacus. Nam eget pharetra est. Vestibulum pulvinar rutrum orci, sit amet dignissim velit suscipit eget. Aenean aliquam, felis id euismod semper, nisl leo pellentesque ante, sit amet venenatis lorem leo vel mi. Mauris sodales, mauris vitae fermentum placerat, massa orci tincidunt enim, sed fringilla justo libero in nisi. Donec ac tempus ex, non dictum neque. Nulla convallis auctor erat, in luctus felis. Proin commodo feugiat neque ac venenatis. Mauris vel odio in eros consequat congue. In interdum justo et odio semper gravida.',
      createdAt: 1657418400,
      updatedAt: 1657418400,
    },
    {
      id: '7',
      categoryId: '1',
      title: 'Nulla vestibulum felis a libero',
      body: 'Nulla vestibulum felis a libero tincidunt, non luctus justo porttitor. Quisque condimentum quam in semper fermentum. Nullam ullamcorper scelerisque tristique. Ut ullamcorper malesuada eros, id accumsan neque tempus et. Mauris id laoreet est, vel fringilla enim. Proin imperdiet odio odio, id tincidunt enim facilisis id. Suspendisse a augue vitae dolor sodales ullamcorper sed ac erat. Ut pellentesque consectetur justo, sed finibus neque ultrices in. Vivamus porttitor enim et sem pellentesque fringilla. Phasellus in faucibus mi, eget consequat nisi. Integer rutrum vestibulum bibendum. Aliquam euismod volutpat cursus. Integer ac erat sapien. Duis tristique mauris eu mi vulputate, sit amet euismod felis auctor. Curabitur id risus id nunc facilisis consectetur. Aliquam eget urna vel tortor tincidunt vestibulum vitae ac odio.',
      createdAt: 1657328400,
      updatedAt: 1657328400,
    },
    {
      id: '8',
      categoryId: '1',
      title: 'Curabitur ac ultricies est',
      body: 'Curabitur ac ultricies est. Sed aliquet, neque sit amet tristique tempus, massa nisi fringilla quam, ut varius metus sapien nec est. Curabitur volutpat metus turpis, nec tristique turpis sagittis eget. Curabitur ut varius odio. Integer sed lorem sem. Suspendisse aliquet eu tellus id lobortis. Quisque efficitur dui sed finibus pulvinar. Nam tristique neque ac laoreet sollicitudin. Nulla tincidunt purus in est tincidunt auctor. Aenean a odio id elit laoreet facilisis. Morbi feugiat neque id magna vulputate, vitae feugiat nulla feugiat. Nam ac libero in nunc elementum facilisis. Fusce nec vestibulum odio. Etiam id semper ex. Vivamus consectetur efficitur metus, at lobortis tortor.',
      createdAt: 1657238400,
      updatedAt: 1657238400,
    },
    {
      id: '9',
      categoryId: '1',
      title: 'Vestibulum id semper risus',
      body: 'Vestibulum id semper risus. Fusce vitae ultrices enim. Curabitur tristique nibh quis quam elementum, sed tempus tellus congue. Integer dapibus leo vitae nulla ultrices, a hendrerit mi consequat. Proin ut ligula lacinia, rhoncus nunc eget, gravida quam. Donec a sapien ex. Sed sed placerat metus, ut lobortis dolor. Sed hendrerit convallis ante eu consequat. Morbi accumsan vestibulum convallis. Aliquam et mauris interdum, malesuada augue sed, tincidunt nunc. Sed a vulputate nibh. Nullam varius faucibus dolor at scelerisque. Nulla facilisi.',
      createdAt: 1657148400,
      updatedAt: 1657148400,
    },
    {
      id: '10',
      categoryId: '1',
      title: 'Nullam vestibulum metus ut elit',
      body: 'Nullam vestibulum metus ut elit interdum, sed vulputate mauris mollis. Morbi non facilisis quam. Sed luctus a elit id pretium. Sed tincidunt pharetra odio id pulvinar. Vestibulum feugiat massa sapien, ut facilisis diam lacinia at. Suspendisse ultricies, mi nec commodo bibendum, purus nisi ultrices lorem, nec feugiat purus orci id purus. Integer sit amet metus eu turpis commodo laoreet at eget odio. Proin consectetur semper volutpat. Nam euismod leo vitae suscipit dictum. Curabitur eleifend est eu lorem facilisis, in pulvinar sapien iaculis. Nunc pharetra tellus mauris, sit amet condimentum massa feugiat et. Aenean faucibus justo ac libero tristique, in mollis neque posuere. Vestibulum bibendum lectus at lacinia vulputate. Mauris finibus elit risus, eget volutpat tortor dapibus id. Integer varius, dolor id tincidunt sagittis, lectus nisl volutpat dui, sit amet eleifend ligula tortor eget erat. Vestibulum varius, mauris sed laoreet',
      createdAt: 1657058400,
      updatedAt: 1657058400,
    },
  ],
};

const delayedFn =
  <T, A extends any[]>(fn: (...args: A) => T, ms: number) =>
  (...args: A) => {
    return new Promise<T>((resolve) =>
      setTimeout(() => resolve(fn(...args)), ms),
    );
  };

export const getUser = delayedFn(() => testData.users[0], 0);

export const getCatgories = delayedFn(
  (id: string) => testData.categories.find((o) => o.id === id) || null,
  300,
);

export const getStories = delayedFn(
  (categoryId: string) =>
    testData.stories.filter((j) => j.categoryId === categoryId),
  300,
);

export const getAllStories = delayedFn(() => testData.stories.slice(0, 4), 300);
export const getMoreStories = delayedFn(() => testData.stories.slice(-2), 300); // get last item and -2 for the last two items

export const getStory = delayedFn(
  (id: string) => testData.stories.find((j) => j.id === id) || null,
  300,
);

const useTestData = <T>(promise: Promise<T>) => {
  const [testData, setTestData] = useState<T | null>(null);

  useEffect(() => {
    if (!testData) {
      promise.then(setTestData);
    }
  }, [promise, testData]);

  return { data: testData, isLoading: !testData };
};

export const useUser = () => useTestData(getUser());

export const useCatgories = (id: string) => useTestData(getCatgories(id));

export const useStories = (categoryId: string) =>
  useTestData(getStories(categoryId));

export const useStory = (id: string) => useTestData(getStory(id));
