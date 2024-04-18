#ifdef RCT_NEW_ARCH_ENABLED
#import "RNOmhMapsPluginGooglemaps.h"

#import <react/renderer/components/RNRNOmhMapsPluginGooglemapsSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNRNOmhMapsPluginGooglemapsSpec/EventEmitters.h>
#import <react/renderer/components/RNRNOmhMapsPluginGooglemapsSpec/Props.h>
#import <react/renderer/components/RNRNOmhMapsPluginGooglemapsSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface RNOmhMapsPluginGooglemaps () <RCTRNOmhMapsPluginGooglemapsViewProtocol>

@end

@implementation RNOmhMapsPluginGooglemaps {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNOmhMapsPluginGooglemapsComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNOmhMapsPluginGooglemapsProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNOmhMapsPluginGooglemapsProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNOmhMapsPluginGooglemapsProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNOmhMapsPluginGooglemapsCls(void)
{
    return RNOmhMapsPluginGooglemaps.class;
}

@end
#endif
