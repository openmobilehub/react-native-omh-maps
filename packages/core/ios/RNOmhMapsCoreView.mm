#ifdef RCT_NEW_ARCH_ENABLED
#import "RNOmhMapsCoreView.h"

#import <react/renderer/components/RNRNOmhMapsCoreViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNRNOmhMapsCoreViewSpec/EventEmitters.h>
#import <react/renderer/components/RNRNOmhMapsCoreViewSpec/Props.h>
#import <react/renderer/components/RNRNOmhMapsCoreViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface RNOmhMapsCoreView () <RCTRNOmhMapsCoreViewViewProtocol>

@end

@implementation RNOmhMapsCoreView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNOmhMapsCoreViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNOmhMapsCoreViewProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNOmhMapsCoreViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNOmhMapsCoreViewProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNOmhMapsCoreViewCls(void)
{
    return RNOmhMapsCoreView.class;
}

@end
#endif
