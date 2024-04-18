#ifdef RCT_NEW_ARCH_ENABLED
#import "RNOmhMapsPluginMapboxView.h"

#import <react/renderer/components/RNRNOmhMapsPluginMapboxViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNRNOmhMapsPluginMapboxViewSpec/EventEmitters.h>
#import <react/renderer/components/RNRNOmhMapsPluginMapboxViewSpec/Props.h>
#import <react/renderer/components/RNRNOmhMapsPluginMapboxViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface RNOmhMapsPluginMapboxView () <RCTRNOmhMapsPluginMapboxViewViewProtocol>

@end

@implementation RNOmhMapsPluginMapboxView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNOmhMapsPluginMapboxViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNOmhMapsPluginMapboxViewProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<RNOmhMapsPluginMapboxViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<RNOmhMapsPluginMapboxViewProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNOmhMapsPluginMapboxViewCls(void)
{
    return RNOmhMapsPluginMapboxView.class;
}

@end
#endif
